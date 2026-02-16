<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
</head>

<div style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 20px;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="background-color:#ffffff; border:1px solid #e5e7eb;">

                    {{-- HEADER --}}
                    @include('emails.partials.header')

                    {{-- BODY --}}
                    <tr>
                        <td style="padding:32px;">

                            <h2 style="margin:0 0 10px 0; font-size:18px; color:#111827;">
                                New Contact Message
                            </h2>

                            <p style="margin:0 0 24px 0; font-size:14px; color:#6b7280;">
                                Someone has reached out through PCC.
                            </p>

                            {{-- Contact Info Card --}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                                <tr>
                                    <td style="padding:16px; background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;">

                                        <p style="margin:4px 0; font-size:14px;">
                                            <strong>First Name:</strong> {{ $contact->first_name }}
                                        </p>

                                        <p style="margin:4px 0; font-size:14px;">
                                            <strong>Last Name:</strong> {{ $contact->last_name }}
                                        </p>

                                        <p style="margin:4px 0; font-size:14px;">
                                            <strong>Email:</strong>
                                            <a href="mailto:{{ $contact->email }}" style="color:#014421;">
                                                {{ $contact->email }}
                                            </a>
                                        </p>

                                    </td>
                                </tr>
                            </table>

                            {{-- Message --}}
                            <h3 style="margin:0 0 10px 0; font-size:16px; color:#111827;">
                                Message
                            </h3>

                            <div style="background-color:#ffffff; border:1px solid #e5e7eb; border-left:4px solid #014421; padding:16px; border-radius:6px; font-size:14px; line-height:1.6; color:#374151;">
                                {!! nl2br(e($contact->message)) !!}
                            </div>

                        </td>
                    </tr>

                    {{-- FOOTER --}}
                    @include('emails.partials.footer')

                </table>

            </td>
        </tr>
    </table>

</div>

</html>