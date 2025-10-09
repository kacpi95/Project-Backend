import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function StatusAlertLogin({ status }) {
  switch (status) {
    case 'success':
      return (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You can now log in..</p>
        </Alert>
      );

    case 'loading':
      return (
        <Spinner animation='border' role='status' className='d-block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      );

    case 'clientError':
      return (
        <Alert variant='danger'>
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      );

    case 'serverError':
      return (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong..</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      );
    default:
      return null;
  }
}
