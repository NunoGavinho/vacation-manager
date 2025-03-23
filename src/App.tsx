import React, { useState } from 'react';
import Auth from './components/Auth';
import { User } from './models/User'; // Importe a interface User

function App() {
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (user: User) => {
        setUser(user);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.email}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Auth onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;