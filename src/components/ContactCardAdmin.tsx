"use client";

import { Card, Image, ListGroup } from 'react-bootstrap';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

interface ContactCardAdminProps {
  contact: Contact;
  notes: Note[];
}

const ContactCardAdmin = ({ contact, notes }: ContactCardAdminProps) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center gap-3">
      <Image src={contact.image} alt={`${contact.firstName} ${contact.lastName}`} width={75} roundedCircle />
      <div>
        <Card.Title>
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle>{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>
  </Card>
);

export default ContactCardAdmin;