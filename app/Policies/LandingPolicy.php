<?php

namespace App\Policies;

use App\Models\PageSection;
use App\Models\User;

class LandingPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function update(User $user, PageSection $section)
    {
        return $user->is_admin;
    }
}
