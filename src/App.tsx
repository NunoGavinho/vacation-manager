import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function App() {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <div>
                    <h1>Bem vindo, {user?.username}</h1>
                    <button onClick={signOut}>Sair</button>
                </div>
            )}
        </Authenticator>
    );
}