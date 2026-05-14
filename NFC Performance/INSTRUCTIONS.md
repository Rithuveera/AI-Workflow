# NFC Performance Testing Guide

To test your NFC Attendance application performance, you can use the provided simulator.

## 1. Setup Environment
Install the necessary Python libraries:
```powershell
pip install -r requirements.txt
```

## 2. Run the Mock Server (Optional)
If you want to see the load test in action without affecting your real database:
```powershell
python mock_server.py
```

## 3. Run the Performance Test
In a new terminal, run the simulator:
```powershell
python nfc_load_test.py
```

## 4. Deep Dive: What's inside the Load Test Code?

The `nfc_load_test.py` script mimics the mobile app's behavior with these features:
*   **Authentication:** Uses a Bearer Token (`AUTH_TOKEN`) for official API access.
*   **Secure Payload:** Sends a valid `HEX_SIGNATURE` and `tag_id` to pass backend verification.
*   **Dynamic Timing:** Generates a fresh `log_time` for every request to avoid duplicate rejection.
*   **Asynchronous Engine:** Uses `asyncio` and `httpx` to fire multiple requests at once without waiting.
*   **Real Metrics:** Calculates success rates and P-metrics (Min/Max/Avg latency).

## 5. Advanced Tuning: Performance Scenarios

You can edit the constants at the top of `nfc_load_test.py` to test different conditions:

| Scenario | Goal | Recommended Settings |
| :--- | :--- | :--- |
| **Baseline** | Measure normal speed | `NUM_TEST_RUNS = 10`, `CONCURRENT_USERS = 1` |
| **Peak Hour** | Simulate 9:00 AM rush | `NUM_TEST_RUNS = 50`, `CONCURRENT_USERS = 20` |
| **Endurance** | Check stability over time | `NUM_TEST_RUNS = 200`, `CONCURRENT_USERS = 5` |

## 6. Testing Offline Sync
To test the "Offline to Online" performance specifically:
1. Modify `nfc_load_test.py` to send a large list of scans in a single batch (if your API supports it).
2. Measure how long the backend takes to process a list of 100+ scans compared to a single scan.

## 7. Mobile App Testing Suggestions
For the physical NFC scan performance:
*   **Hardware Compatibility:** Test with at least 5 different mobile models (some NFC readers are faster than others).
*   **Optimal Placement:** Measure the distance and angle needed for the fastest scan.
*   **Caching:** Ensure the mobile app caches employee names locally so it doesn't wait for a network call just to display "Welcome [Name]".

## 8. Reporting and Team Communication

When mentioning this work in **standup calls** or **status reports**, you can use these key points:

### The "Quick" Update (30 seconds)
> "I've completed a custom performance testing utility for the NFC sync process. Instead of JMeter, I developed a Python-based asynchronous simulator to handle our specific payload requirements (dynamic timestamps/signatures). Today, I'll be using it to measure backend latency and success rates under load."

### The "Technical" Justification (If asked why not JMeter)
*   **Efficiency:** It's more lightweight than JMeter and runs natively without Java overhead.
*   **Maintainability:** Being pure Python, it's easily version-controlled and peer-reviewed in Git.
*   **Logic:** It makes handling the dynamic `HEX_SIGNATURE` and `log_time` much more reliable than using JMeter's GUI-based functions.

### Key Metrics to Report
Focus on the summary table printed by the script:
*   **Success Rate:** (Target: 100%)
*   **Avg/Max Latency:** (Target: < 300ms for Avg)

## 9. How to Interpret Your Results

When the script finishes, compare your numbers to this guide to see if the server is stable:

*   **If Success is 100% and Avg < 300ms:** The server is **STABLE**. It can easily handle the current number of concurrent users.
*   **If Success is 100% but Avg > 1000ms:** The server is **OVERLOADED**. It isn't crashing, but users will complain about the app being slow.
*   **If Success < 100%:** The server is **UNSTABLE**. It is dropping scans, and data is being lost. You need to check the backend logs for "500 Internal Server Errors".
*   **If Max Latency is 10x higher than Avg:** You have a **Bottleneck**. The server is mostly fast, but occasionally gets stuck (usually waiting for a database lock).
