'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

interface ContactCardProps {
  contact: Contact;
  notes: Note[];
}

const ContactCard = ({ contact, notes }: ContactCardProps) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center gap-3">
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
        roundedCircle
      />
      <div>
        <Card.Title>
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle>{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    {notes.length > 0 && (
      <ListGroup variant="flush" style={{ borderTop: 0, borderBottom: 0 }}>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
    )}
    <AddNoteForm contactId={contact.id} />
    <Card.Footer>
      <Link href={`/edit/contact/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
