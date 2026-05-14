"""
Quota Wait Timer - Helps you know when to retry after hitting quota limits
"""
import time
from datetime import datetime, timedelta

def countdown_timer(seconds, message=""):
    """Display a countdown timer"""
    end_time = datetime.now() + timedelta(seconds=seconds)
    
    print(f"\n{'='*60}")
    print(f"⏰ QUOTA WAIT TIMER")
    print(f"{'='*60}")
    if message:
        print(f"📝 {message}")
    print(f"⏱️  Waiting for {seconds} seconds...")
    print(f"🕐 Will be ready at: {end_time.strftime('%H:%M:%S')}")
    print(f"{'='*60}\n")
    
    try:
        for remaining in range(seconds, 0, -1):
            mins, secs = divmod(remaining, 60)
            timer = f'{mins:02d}:{secs:02d}'
            print(f'\r⏳ Time remaining: {timer} ', end='', flush=True)
            time.sleep(1)
        
        print(f'\r✅ Ready! You can try again now!{" "*30}')
        print(f"\n{'='*60}")
        print("🎉 Quota should be reset. Try uploading your document again!")
        print(f"{'='*60}\n")
        
    except KeyboardInterrupt:
        print(f'\n\n⚠️  Timer cancelled. You can try again anytime.')

if __name__ == "__main__":
    print("\n🔄 Gemini API Quota Reset Timer\n")
    print("Choose wait time:")
    print("1. Quick reset (60 seconds) - For rate limit")
    print("2. Safe reset (120 seconds) - Recommended")
    print("3. Custom time")
    
    choice = input("\nEnter choice (1-3): ").strip()
    
    if choice == "1":
        countdown_timer(60, "Waiting for rate limit to reset (1 minute)")
    elif choice == "2":
        countdown_timer(120, "Waiting for safe quota reset (2 minutes)")
    elif choice == "3":
        try:
            custom_seconds = int(input("Enter seconds to wait: "))
            countdown_timer(custom_seconds, f"Custom wait time ({custom_seconds} seconds)")
        except ValueError:
            print("❌ Invalid input. Using default 120 seconds.")
            countdown_timer(120, "Default safe reset (2 minutes)")
    else:
        print("❌ Invalid choice. Using default 120 seconds.")
        countdown_timer(120, "Default safe reset (2 minutes)")
