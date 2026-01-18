<?php

namespace App\Http\Controllers;

use App\Models\ThemeSetting;
use App\Support\ThemeCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ThemeSettingController extends Controller
{
    public function update(Request $request)
    {
        foreach ($request->themes as $key => $value) {
            ThemeSetting::where('key', $key)->update([
                'value' => $value,
            ]);
        }

        Cache::forget(ThemeCache::KEY);

        return back()->with('success', 'Theme updated');
    }
}
