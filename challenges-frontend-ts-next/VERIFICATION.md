# Verification Guide

## Pre-deployment Verification

### 1. Installation Verification
```bash
cd challenges-frontend-ts-next
npm install
```

Expected: No errors, all dependencies installed.

### 2. Type Checking
```bash
npm run type-check
```

Expected: No TypeScript errors.

### 3. Linting
```bash
npm run lint
```

Expected: No ESLint errors or warnings.

### 4. Development Server
```bash
npm run dev
```

Expected:
- Server starts on http://localhost:3000
- No compilation errors
- Browser opens automatically (optional)

### 5. Production Build
```bash
npm run build
```

Expected:
- Build completes successfully
- `.next` directory created
- No build errors
- Output shows optimized bundle sizes

### 6. Production Server
```bash
npm start
```

Expected:
- Server starts on http://localhost:3000
- Application runs in production mode

## Functional Testing

### Backend Services Required
Before testing, ensure these services are running:
- Multiplication Service: http://localhost:8080
- Gamification Service: http://localhost:9001

### Test Cases

#### TC1: Initial Load
1. Open http://localhost:3000
2. Verify: Challenge displays two numbers (e.g., "13 x 7")
3. Verify: Form has two input fields (alias, guess)
4. Verify: Submit button is present
5. Verify: Leaderboard section loads

#### TC2: Submit Correct Answer
1. Enter alias: "testuser"
2. Calculate correct answer (e.g., 13 x 7 = 91)
3. Enter guess: 91
4. Click Submit
5. Verify: Success message appears
6. Verify: New challenge loads
7. Verify: Last attempts table appears
8. Verify: Attempt shows as correct (green)

#### TC3: Submit Incorrect Answer
1. Enter alias: "testuser"
2. Enter wrong guess: 100
3. Click Submit
4. Verify: Error message shows correct answer
5. Verify: New challenge loads
6. Verify: Attempt shows as incorrect (red)

#### TC4: Leaderboard Auto-refresh
1. Submit several correct answers
2. Wait 5 seconds
3. Verify: Leaderboard updates automatically
4. Verify: User appears in leaderboard
5. Verify: Score increases

#### TC5: Multiple Attempts
1. Submit 3-5 attempts
2. Verify: Last attempts table shows all attempts
3. Verify: Each attempt shows challenge, guess, and result
4. Verify: Colors indicate correct (green) / incorrect (red)

#### TC6: Form Validation
1. Try to enter alias > 12 characters
2. Verify: Input limited to 12 characters
3. Try to enter negative number in guess
4. Verify: Cannot enter negative numbers

#### TC7: Error Handling
1. Stop backend services
2. Try to submit answer
3. Verify: Error message displays
4. Verify: Application doesn't crash

## Docker Verification

### Build Docker Image
```bash
docker build -t challenges-frontend-next .
```

Expected:
- Build completes successfully
- Image size is reasonable (~150-200MB)

### Run Docker Container
```bash
docker run -p 3000:3000 challenges-frontend-next
```

Expected:
- Container starts successfully
- Application accessible at http://localhost:3000
- All functionality works as in local development

### Docker Compose (Optional)
If you have docker-compose.yml:
```bash
docker-compose up
```

## Performance Verification

### 1. Build Size
Check `.next/static` directory after build:
- JavaScript bundles should be optimized
- Check for code splitting (multiple chunk files)

### 2. Load Time
- Initial page load should be < 2 seconds
- Subsequent navigation should be instant

### 3. Network Requests
Open browser DevTools → Network:
- Check API calls are proxied correctly
- Verify no CORS errors
- Check leaderboard refreshes every 5 seconds

### 4. Memory Usage
Open browser DevTools → Performance:
- Monitor memory usage during leaderboard auto-refresh
- Verify no memory leaks after 1 minute

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Accessibility Verification

1. Check form labels are properly associated
2. Verify keyboard navigation works
3. Check color contrast for correct/incorrect indicators
4. Test with screen reader (optional)

## Security Verification

1. Check no sensitive data in client-side code
2. Verify API endpoints are properly proxied
3. Check no console errors or warnings
4. Verify input sanitization works

## Production Readiness Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Production build succeeds
- [ ] Docker build succeeds
- [ ] All functional tests pass
- [ ] Performance is acceptable
- [ ] No memory leaks
- [ ] Error handling works
- [ ] Browser compatibility verified
- [ ] Documentation is complete

## Common Issues and Solutions

### Issue: Port 3000 already in use
Solution:
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Issue: API calls fail with CORS error
Solution:
- Check `next.config.ts` rewrites configuration
- Ensure backend services are running
- Verify backend URLs are correct

### Issue: Build fails with memory error
Solution:
```bash
# Increase Node.js memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Issue: Docker build fails
Solution:
- Check Dockerfile syntax
- Ensure all files are present
- Try building with `--no-cache` flag

### Issue: Leaderboard doesn't update
Solution:
- Check browser console for errors
- Verify gamification service is running
- Check network tab for API calls

## Monitoring in Production

1. **Error Tracking**: Consider adding Sentry or similar
2. **Analytics**: Add Google Analytics or similar
3. **Performance**: Monitor with Lighthouse or similar
4. **Uptime**: Use uptime monitoring service

## Rollback Plan

If deployment fails:
1. Keep previous version running
2. Investigate issues in staging
3. Fix and redeploy
4. Document issues for future reference
