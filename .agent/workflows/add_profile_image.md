---
description: Add a new character profile image and update the content configuration.
---
This workflow guides you through adding a new character image to the profile section.

1. **Get Requirements**
   - Ask the user for the source image.
   - Ask for the button label text (e.g., "Summer Outfit", "Anniversary").

2. **Process Image**
   - If the image needs background removal, use `generate_image` to create a version with a white or transparent background.
   - Prompt: "Remove background, isolate character, white background" or similar.

3. **Determine Filenames**
   - Propose filenames following the existing convention:
     - Full body: `public/images/profile/full_body_[name].png`
     - Icon: `public/images/profile/icon_[name].png`

4. **Save Images**
   - Save the processed image to the determined paths.
   - If a separate icon is not provided, correct the icon path to reuse the main image or generate a crop.

5. **Update Configuration**
   - Edit `data/content.json`.
   - Find the `profileDetail.images` array.
   - Add a new object:
     ```json
     {
         "src": "/images/profile/full_body_[name].png",
         "label": "[Label Name]",
         "icon": "/images/profile/icon_[name].png"
     }
     ```

6. **Verify**
   - Ask the user to check if the new button appears and works correctly.
