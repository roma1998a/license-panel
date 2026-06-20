let users = []; // Fake DB (مؤقت)

/**
 * @desc Register new user
 */
exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }

    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.status(409).json({
            success: false,
            message: 'User already exists'
        });
    }

    const newUser = {
        id: Date.now(),
        username,
        password // ⚠️ بدون تشفير حالياً (للتجربة)
    };

    users.push(newUser);

    res.json({
        success: true,
        message: 'User registered successfully',
        data: {
            id: newUser.id,
            username: newUser.username
        }
    });
};

/**
 * @desc Login user
 */
exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    res.json({
        success: true,
        message: 'Login successful',
        token: 'fake-jwt-token-12345',
        user: {
            id: user.id,
            username: user.username
        }
    });
};

/**
 * @desc Get all users
 */
exports.getUsers = (req, res) => {
    res.json({
        success: true,
        data: users.map(u => ({
            id: u.id,
            username: u.username
        }))
    });
};

/**
 * @desc Delete user
 */
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    const index = users.findIndex(u => u.id == id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    users.splice(index, 1);

    res.json({
        success: true,
        message: 'User deleted'
    });
};
