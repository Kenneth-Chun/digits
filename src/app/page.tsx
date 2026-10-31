import { Col, Container, Row } from 'react-bootstrap';
import { Calendar2CheckFill, FileEarmarkTextFill, PeopleFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" className="py-3">
      <Row>
        <Col className="text-center">
          <PeopleFill size={100} />
          <h1>Manage Contacts</h1>
          <h5>
            This address book enables any number of users to register and save their business
            contacts. You can only see the contacts you have created.
          </h5>
        </Col>
        <Col className="text-center">
          <FileEarmarkTextFill size={100} />
          <h1>Contact Details</h1>
          <h5>For each contact, you can save their name, address, and phone number.</h5>
        </Col>
        <Col className="text-center">
          <Calendar2CheckFill size={100} />
          <h1>Contact Notes</h1>
          <h5>
            Each time you make contact with a contact, you can write a note that summarizes the
            conversation. This note is saved along with a timestamp with the contact.
          </h5>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;

