'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

interface AddNoteFormValues {
  note: string;
  contactId: number;
  owner: string;
}

interface AddNoteFormProps {
  contactId: number;
}

const AddNoteForm = ({ contactId }: AddNoteFormProps) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddNoteFormValues>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      contactId,
      owner: currentUser,
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValue('owner', currentUser, { shouldValidate: true });
    }
    setValue('contactId', contactId, { shouldValidate: true });
  }, [contactId, currentUser, setValue]);

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
    <Card className="mx-3 mb-3">
      <Card.Header className="text-center">Add Timestamped Note</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label htmlFor={`note-${contactId}`}>Note</Form.Label>
            <Form.Control
              id={`note-${contactId}`}
              {...register('note')}
              isInvalid={Boolean(errors.note)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.note?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input
            type="hidden"
            {...register('contactId', { valueAsNumber: true })}
            value={contactId}
          />
          <Form.Group className="mt-3">
            <Row>
              <Col>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Col>
              <Col>
                <Button
                  type="button"
                  onClick={() => reset()}
                  variant="warning"
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
