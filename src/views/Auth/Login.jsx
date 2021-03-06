import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import styles from './Login.css';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { formState, handleFormChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState(null);

  // The `from` property of `location.state` gives us
  // the URL to redirect to after logging in.
  const { from } = location.state || { from: { pathname: '/' } };

  const handleLogin = (event) => {
    event.preventDefault();
    const loginWasSuccessful = auth.login(formState.email, formState.password);

    // TODO: If login was unsuccessful, set an error with a message
    // to display to the user that their login failed.
    // If login was successful, use the history hook
    
    if(loginWasSuccessful) {
      history.replace(from)
    } else {
      setError('Login failed')
    }
   
  };

  return (
    <>
      <h3>You must log in to view the page at {from.pathname}</h3>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <label htmlFor='email'>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={(e) => handleFormChange(e)}
        />{' '}
        <label htmlFor='password'>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formState.password}
          onChange={(e) => handleFormChange(e)}
        />
        <button type="submit" aria-label="Sign In">
          Sign in
        </button>
      </form>
      {error && <h4 className={styles.error}>{error}</h4>}
    </>
  );
}
