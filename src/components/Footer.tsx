import { Col, Container } from 'react-bootstrap';
import Link from 'next/link';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center">
        Department of Information and Computer Sciences
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
        <Link href="/">Digits Contact Manager</Link>
      </Col>
    </Container>
  </footer>
);

export default Footer;
