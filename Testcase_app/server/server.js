import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import requirementsRouter from './routes/requirements.js';
import testCasesRouter from './routes/testCases.js';
import executionsRouter from './routes/executions.js';
import authRouter from './routes/auth.js';
import os from 'os';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/requirements', requirementsRouter);
app.use('/api/test-cases', testCasesRouter);
app.use('/api/executions', executionsRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'TestFlow API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'TestFlow API Server',
        version: '1.0.0',
        endpoints: {
            requirements: '/api/requirements',
            testCases: '/api/test-cases',
            executions: '/api/executions',
            health: '/api/health'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});



function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalIp();
    console.log(`\n🚀 TestFlow API Server running`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://${localIp}:${PORT}`);
    console.log(`📊 API Documentation: http://${localIp}:${PORT}/`);
    console.log(`💚 Health Check: http://${localIp}:${PORT}/api/health\n`);
});
