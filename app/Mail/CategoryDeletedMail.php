<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CategoryDeletedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var array */
    public array $categoryData;

    /** @var array */
    public array $userData;

    /**
     * Create a new message instance.
     */
    public function __construct(array $categoryData, array $userData)
    {
        $this->categoryData = $categoryData;
        $this->userData = $userData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Category Deleted: ' . $this->categoryData['name'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.category-deleted',
            with: [
                'category' => $this->categoryData,
                'user' => $this->userData,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
