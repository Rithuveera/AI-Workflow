# TestFlow - Daily Access Guide

## Tomorrow (and Every Day) - Quick Reference

### 🖥️ Accessing from YOUR Computer

**Always use these URLs (they NEVER change):**
- **Application:** http://localhost:5173
- **API:** http://localhost:3001

✅ Bookmark this: `http://localhost:5173`

---

### 🌐 Accessing from OTHER Computers

**Your IP address changes daily, so follow these steps:**

#### Step 1: Find Today's IP Address

Choose ONE of these methods:

**Method 1 (Easiest):** Double-click this file:
```
show-urls.bat
```

**Method 2:** Run in PowerShell:
```powershell
.\show-urls.ps1
```

**Method 3:** Look at the backend server terminal when it starts:
```
🚀 TestFlow API Server running
   Network: http://192.168.0.XXX:3001  ← This is your IP
```

**Method 4:** Run this command:
```powershell
ipconfig | findstr IPv4
```

#### Step 2: Share the URL

If your IP today is `192.168.0.150`, share this with your team:
```
http://192.168.0.150:5173
```

---

## 📋 Daily Checklist

Every morning:

1. ✅ Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. ✅ Start the frontend server (in a new terminal):
   ```bash
   npm run dev
   ```

3. ✅ Find today's IP address (use `show-urls.bat`)

4. ✅ Share the new URL with your team

---

## 🔧 Troubleshooting

**Q: The application doesn't load?**
- Check if both servers are running
- Use `http://localhost:5173` on your computer
- Make sure no firewall is blocking ports 5173 or 3001

**Q: Team members can't access?**
- Verify you shared today's IP address (not yesterday's)
- Run `show-urls.bat` to get the current URL
- Ensure they're on the same network

**Q: Getting JSON errors?**
- The application now handles these automatically
- Check browser console for specific error messages
- Ensure backend server is running

---

## 💡 Pro Tips

1. **Create a Desktop Shortcut:**
   - Right-click `show-urls.bat`
   - Send to → Desktop (create shortcut)
   - Run it every morning!

2. **Bookmark localhost:**
   - On your computer, bookmark `http://localhost:5173`
   - This URL never changes!

3. **Team Communication:**
   - Send the new URL in your team chat every morning
   - Or set up a shared document with the daily URL

---

## 📞 Quick Commands Reference

| Task | Command |
|------|---------|
| Find current IP | `.\show-urls.bat` |
| Start backend | `cd server && npm run dev` |
| Start frontend | `npm run dev` |
| Check IP manually | `ipconfig \| findstr IPv4` |

---

**Last Updated:** 2025-12-04
**Application:** TestFlow - Test Case Management System
