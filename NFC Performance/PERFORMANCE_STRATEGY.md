# NFC Attendance Performance Testing Strategy

This document outlines the approach for testing the performance and scalability of the NFC-based attendance management system.

## 1. Key Performance Indicators (KPIs)
*   **Scan Recognition Time:** Time taken from tapping the NFC tag to the mobile app displaying a success message.
*   **Offline Storage Latency:** Time taken to save a scan locally when in offline mode.
*   **Sync Completion Time:** Time taken to upload X number of offline records when switching to online mode.
*   **Backend Response Time (P95/P99):** Time taken for the server to process a check-in/check-out request.
*   **Concurrent Scan Capacity:** Maximum number of simultaneous scans the system can handle (e.g., peak arrival time).

## 2. Testing Tiers

### Tier 1: Local App Performance (Hardware/OS)
*   **Tool:** Manual Stopwatch / App-level logging.
*   **Test Case:** Measure time taken for 10 consecutive scans.
*   **Focus:** Ensure the NFC polling rate and processing logic don't lag after multiple uses.

### Tier 2: Sync & Network Performance
*   **Tool:** Network Throttling (Charles Proxy / Fiddler / DevTools).
*   **Test Case:** Simulate 50 offline records and sync them under 3G/4G conditions.
*   **Focus:** Measure payload size and retry logic performance.

### Tier 3: Backend Stress Testing (High Volume)
*   **Tool:** JMeter, Locust, or custom Node.js/Python scripts.
*   **Test Case:** Simulate 500+ employees scanning within a 5-minute window.
*   **Focus:** Identify database bottlenecks and lock issues during check-in/check-out logic.

## 3. Tool Selection: Custom Python vs. JMeter
While JMeter is a standard tool, this project utilizes a **Custom Asynchronous Python Simulator** for Tier 3 testing.

### Why Custom Python (AsyncIO)?
1.  **Complex Logic:** NFC payloads require specific dynamic timestamps and HEX signatures. Implementing this logic is significantly cleaner in pure Python than in JMeter's XML-based functions.
2.  **Version Control:** Python scripts are easily readable, diff-able, and maintainable in Git/SVN.
3.  **Efficiency:** The `httpx` + `asyncio` stack is extremely lightweight, allowing high concurrency from a standard workstation without the JVM overhead of JMeter.
4.  **Integration:** Easily share configuration and logic between the test scripts and the mock server.

---

## 4. Stability Benchmarks (Thresholds)

Use these benchmarks to determine if the server is stable:

| Metric | Stable (Healthy) | Warning (Slow) | Critical (Unstable) |
| :--- | :--- | :--- | :--- |
| **Success Rate** | 100% | 95% - 99.9% | < 95% (Errors appearing) |
| **Avg Latency** | < 300ms | 300ms - 800ms | > 1000ms (User feels lag) |
| **Max Latency** | < 600ms | 800ms - 2000ms | > 3000ms (Likely DB locks) |

---

# Implementation Plan & Results
The `nfc_load_test.py` script provides a full implementation of this strategy, focused on simulating valid check-in/sync traffic.

### How to communicate this in Standups:
*   **Completed:** Developed a code-centric performance testing utility for the NFC sync process using Python/AsyncIO.
*   **Value:** This allows for precise simulation of dynamic NFC payloads and high-concurrency stress testing without the overhead of traditional GUI tools.
*   **Metric Focus:** Tracking P95/P99 latency and Success Rates for the `/api/v1/attendance/log` endpoint.
