const users = []; // مؤقت (بدون DB)

/**
 * @desc Test admin controller
 */
exports.testAdmin = (req, res) => {
    res.json({
        success: true,
        message: 'Admin controller is working'
    });
};

/**
 * @desc Admin login
 */
exports.login = (req, res) => {
    const { username, password } = req.body;

    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '1234';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.json({
            success: true,
            message: 'Login successful',
            token: 'fake-admin-token-12345'
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    });
};

/**
 * @desc Get dashboard data
 */
exports.dashboard = (req, res) => {
    res.json({
        success: true,
        message: 'Welcome Admin',
        stats: {
            usersCount: users.length,
            systemStatus: 'active'
        }
    });
};

/**
 * @desc Get all users (fake)
 */
exports.getUsers = (req, res) => {
    res.json({
        success: true,
        data: users
    });
};

/**
 * @desc Add user (fake)
 */
exports.addUser = (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({
            success: false,
            message: 'Username required'
        });
    }

    const newUser = {
        id: Date.now(),
        username
    };

    users.push(newUser);

    res.json({
        success: true,
        message: 'User added',
        data: newUser
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
