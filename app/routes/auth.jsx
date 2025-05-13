import { redirect } from 'react-router';
import AuthForm from '../components/auth/AuthForm';
import {
  hasMinLength,
  isEqualsToOtherValue,
  isNotEmpty,
  isValidPhoneNumber,
} from '../utils/validation';

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function clientAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  console.log(mode);

  if (mode !== 'login' && mode !== 'register') {
    return { message: ['Unsupported mode.'], status: 422 };
  }

  let errorMessages = [];

  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');
  if (!isNotEmpty(username)) errorMessages.push('username is not Valid.');
  if (!hasMinLength(password, 8)) errorMessages.push('Password is Short.');

  let authData = {
    username,
    password,
  };

  if (mode === 'register') {
    const passConfirm = data.get('password-confirmation');
    if (!isEqualsToOtherValue(password, passConfirm))
      errorMessages.push(
        'The Password and the Password-confirmation is not equal.'
      );

    const email = data.get('email');
    if (!isNotEmpty(email)) errorMessages.push('email is not Valid.');

    authData = { ...authData, email };
  }

  if (errorMessages.length != 0) {
    return { messages: errorMessages, status: 400 };
  }

  let res = await fetch(`http://localhost:8765/auth/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (!res.ok) {
    return { messages: ['Failed to authenticate user.'], status: 400 };
  }

  if (mode === 'register') {
    res = await fetch(`http://localhost:8765/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    if (!res.ok) {
      return { messages: ['Failed to authenticate user.'], status: 400 };
    }
  }
  const { access_token } = await res.json();

  const payload = access_token.split('.')[1];
  const decodedPayload = atob(payload);
  const decoded = JSON.parse(decodedPayload);
  const id = decoded.userId;

  localStorage.setItem('id', id);
  localStorage.setItem('jwt', access_token);

  throw redirect('/');
}
