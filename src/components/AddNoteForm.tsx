'use client';

import { useSession } from 'next-auth/react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

type AddNoteFormValues = {
  note: string;
  contactId: number;
  owner: string;
};

const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNoteFormValues>({
    resolver: yupResolver(AddNoteSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: AddNoteFormValues) => {
    await addNote(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <Form.Group>
        <Form.Label>Add Timestamped Note</Form.Label>
        <Form.Control
          as="textarea"
          {...register('note')}
          className={errors.note ? 'is-invalid' : ''}
        />
        <div className="invalid-feedback">{errors.note?.message}</div>
      </Form.Group>
      <input type="hidden" {...register('owner')} value={currentUser} />
      <input
        type="hidden"
        {...register('contactId', { valueAsNumber: true })}
        value={contactId}
      />
      <Button type="submit" variant="primary" className="mt-2">
        Submit
      </Button>
    </Form>
  );
};

export default AddNoteForm;
