import { ClientSession } from 'react-client-session';

// En cualquier componente o función
const userId = ClientSession.get('userId');
if (userId) {
  // El usuario ha iniciado sesión
  console.log('Usuario ID:', userId);
} else {
  // No hay usuario en sesión
  console.log('No hay usuario en sesión');
}