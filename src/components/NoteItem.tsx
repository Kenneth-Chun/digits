'use client';

import { ListGroup } from 'react-bootstrap';
import type { Note } from '@prisma/client';

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => (
  <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
