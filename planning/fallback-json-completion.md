# Fallback JSON Completion Plan

## Goal
Complete `resources/content/fallback.json` with all text content currently hardcoded in the four section components, so the app can run without a database for v1.

## Decisions
- **Pricing**: Simplify to a single price string (drop the `{ monthly, annually }` structure)
- **Text format**: Keep it simple — flat strings, no `{ text, padding, id }` TextBlock wrapper. Future-proofing can happen later.
- **Videos**: Include video data in the fallback

## Current State of `fallback.json`
Already has:
- `landing_intro` — headline + paragraphs as flat strings
- `intro_video_section_title` — headline

## Sections to Add

### 1. `contact_section`
**Source**: `ContactSection.tsx`

```json
"contact_section": {
    "headline": "Let's Talk About Your Future",
    "form": {
        "fields": {
            "first_name": { "label": "First Name" },
            "last_name": { "label": "Last Name" },
            "email": { "label": "Email" },
            "message": { "label": "Message" }
        },
        "submit_label": "Contact"
    }
}
```

### 2. `packages_section`
**Source**: `PackageSection.tsx`

```json
"packages_section": {
    "headline": "Packages",
    "tiers": [
        {
            "name": "Post-Grad Reset",
            "id": "post-grad-reset",
            "href": "https://stan.store/IngaPeterson",
            "price": "$149",
            "priceSubText": "session",
            "image": "/images/post-grad-reset-static.png",
            "description": "A focused 60-minute coaching session designed to help you reset your energy, regain perspective, and get clear on what actually matters right now — during senior year or the months after graduation.",
            "features": [],
            "cta": "Buy Package"
        },
        {
            "name": "Post-Grad Starter Pack",
            "id": "post-grad-starter-pack",
            "href": "https://stan.store/IngaPeterson",
            "image": "/images/post-grad-starter-pack-static.png",
            "price": "$375",
            "priceSubText": "3 sessions",
            "description": "A three-session coaching package designed to support seniors and recent graduates during a high-pressure transition. This is for when decisions keep coming and you want steady guidance, clearer thinking, and support over time—not just one conversation",
            "features": [],
            "cta": "Buy Package"
        },
        {
            "name": "Post-Grad Navigation",
            "id": "post-grad-navigation",
            "href": "https://stan.store/IngaPeterson",
            "image": "/images/post-grad-navigation.png",
            "price": "$990",
            "priceSubText": "8 weeks",
            "description": "An ongoing coaching option for seniors and recent grads navigating big decisions and rising pressure around graduation and what comes next. This work offers steady support as choices unfold—helping you think clearly, stay grounded, and move forward without rushing yourself or trying to figure everything out alone.Post-Grad Navigation is offered as ongoing coaching with a two-month minimum commitment.",
            "features": [],
            "cta": "Buy Package"
        },
        {
            "name": "Ask Me Anything (AMA)",
            "id": "ask-me-anything",
            "href": "https://stan.store/IngaPeterson",
            "image": "/images/ask-me-anything-static.png",
            "price": "$30",
            "priceSubText": "session",
            "description": "A short coaching video focused on one question or decision that's weighing on you.Get perspective and guidance you can revisit whenever you need it.",
            "features": [],
            "cta": "Buy Package"
        }
    ]
}
```

### 3. `testimonials_section`
**Source**: `TestimonalSection.tsx`

Full testimonial text included (not truncated).

```json
"testimonials_section": {
    "headline": "Testimonials",
    "testimonials": [
        {
            "id": 1,
            "body": "Life transitions can be complex, unsettling, and confusing at any age. As a recent non-traditional-age college graduate, I face some unique challenges as I embark upon a leveling up in my career choices. Before working with Inga, the biggest issue I faced was that voice in my head that continually undermined my innate potential. Inga's insightful coaching helped me to examine these thoughts to determine their actual validity. As a result, I now instinctively find myself stopping to ask that voice if it is true or not. The answer is no. Utilizing the principles of Energy Leadership, I am able to raise my awareness and interpret my opinions, assumptions, and beliefs from a broader perspective. I now have the tools to make conscious choices and to show up authentically.",
            "author": {
                "name": "Mary - Smith College",
                "imageUrl": ""
            }
        },
        {
            "id": 2,
            "body": "Working with Inga in her senior strategy sessions was an incredible experience—her generosity, industry expertise, and calming presence made navigating career decisions so much easier. She genuinely wants to see others succeed, and I came away feeling not only more prepared but also supported by someone I can trust and talk to about anything.",
            "author": {
                "name": "Athan - Duke University",
                "imageUrl": ""
            }
        },
        {
            "id": 3,
            "body": "If you feel like you are struggling during a transition like graduating from college, being coached by Inga is a really valuable process to help you become more self-aware, provide you with the tools to shift your energy and take formative steps towards your goals. These sessions allowed me to re-evaluate how I am doing mentally and emotionally at this stage of my life and I was able to find out new things about myself. I always felt listened to and supported without feeling judged or criticized. I gained valuable insight about my mindset and when my energy is fruitful or destructive and also new ways to articulate how I am feeling. I cannot recommend Inga's coaching enough. It was exactly what I needed to motivate myself to take charge of my future.",
            "author": {
                "name": "Yara - Smith College",
                "imageUrl": ""
            }
        }
    ]
}
```

### 4. `intro_video_gallery`
**Source**: `VideoSeeder.php` — 3 TikTok videos

```json
"intro_video_gallery": {
    "videos": [
        {
            "id": 1,
            "title": "About Me and My Work",
            "description": null,
            "platform": "tiktok",
            "external_id": "7592828341716012301",
            "url": "https://www.tiktok.com/@inga.peterson/video/7592828341716012301",
            "thumbnail_url": "/images/about-me-static.png",
            "sort_order": 1
        },
        {
            "id": 2,
            "title": "Navigating the Post-Grad Transition",
            "description": null,
            "platform": "tiktok",
            "external_id": "7594494048778390839",
            "url": "https://www.tiktok.com/@inga.peterson/video/7594494048778390839",
            "thumbnail_url": "/images/three-things-static.png",
            "sort_order": 2
        },
        {
            "id": 3,
            "title": "The Cycle of Change and the Post-Grad Transition",
            "description": null,
            "platform": "tiktok",
            "external_id": "7597633314241006861",
            "url": "https://www.tiktok.com/@inga.peterson/video/7597633314241006861",
            "thumbnail_url": "/images/cycle-of-change-static.png",
            "sort_order": 3
        }
    ]
}
```

---

## Next Steps (after this JSON is populated)
The bigger refactor: update each component to import from `fallback.json` instead of hardcoding data inline. This will involve:
1. Creating a content loader (utility or hook) that reads from the JSON
2. Updating `ContactSection`, `PackageSection`, `TestimonalSection`, and `FeatureSection` to consume data from the loader
3. Removing the `usePageEditor` / `SectionProvider` / DB dependency from these components but do not delete `usePageEditor` or `SectionProvider`
4. Cleaning up unused DB models, migrations, seeders, and types related to the old page editor system
