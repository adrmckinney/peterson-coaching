<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Contact Form Recipients
    |--------------------------------------------------------------------------
    |
    | Comma-separated list of email addresses that will receive contact form
    | submissions. Configured via the CONTACT_RECIPIENTS environment variable.
    |
    */

    'recipients' => array_values(array_filter(array_map('trim', explode(',', (string) env('CONTACT_RECIPIENTS', ''))))),

];
