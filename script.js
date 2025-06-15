document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const descriptionEl = document.getElementById('description');
    const apiKeyEl = document.getElementById('apiKey');
    const charactersContainer = document.getElementById('charactersContainer');
    const addCharacterBtn = document.getElementById('addCharacterBtn');
    const locationEl = document.getElementById('location');
    const timeOfDayEl = document.getElementById('timeOfDay');
    const weatherEl = document.getElementById('weather');
    const seasonEl = document.getElementById('season');
    const audioAtmosphereMoodEl = document.getElementById('audioAtmosphereMood');
    const cameraStyleEl = document.getElementById('cameraStyle');
    const cameraMovementEl = document.getElementById('cameraMovement');
    const cameraAngleEl = document.getElementById('cameraAngle');
    const cameraFocusEl = document.getElementById('cameraFocus');
    const lightingEl = document.getElementById('lighting');
    const colorGradingEl = document.getElementById('colorGrading');
    const dialogueTypeEl = document.getElementById('dialogueType');
    const dialoguesSection = document.getElementById('dialoguesSection');
    const dialoguesContainer = document.getElementById('dialoguesContainer');
    const addDialogueBtn = document.getElementById('addDialogueBtn');
    const environmentalSoundEl = document.getElementById('environmentalSound');
    const backgroundMusicEl = document.getElementById('backgroundMusic');
    const additionalDetailsEl = document.getElementById('additionalDetails');
    const videoStyleEl = document.getElementById('videoStyle');
    const videoQualityEl = document.getElementById('videoQuality');
    const durationEl = document.getElementById('duration');
    const generateBtn = document.getElementById('generateBtn');
    const optimizeBtn = document.getElementById('optimizeBtn');
    const quickIdeationBtn = document.getElementById('quickIdeationBtn');
    const ideationLoader = document.getElementById('ideationLoader');
    const messageEl = document.getElementById('message');
    const outputsContainer = document.getElementById('outputsContainer');

    let characterCount = 0;
    let dialogueCount = 0;
    let englishPrompt = '';

    // --- Helper Functions ---
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    const translateToId = (text, type = 'general') => {
        if (!text) return '';
        text = text.trim();
        const translations = {
            timeOfDay: { 'Morning': 'Pagi', 'Day': 'Siang', 'Afternoon': 'Sore', 'Night': 'Malam', 'Dawn': 'Dini Hari' },
            weather: { 'Clear': 'Cerah', 'Cloudy': 'Berawan', 'Rainy': 'Hujan', 'Stormy': 'Badai', 'Snowy': 'Salju' },
            season: { 'Spring': 'Semi', 'Summer': 'Panas', 'Autumn': 'Gugur', 'Winter': 'Dingin', 'Rainy Season': 'Musim Hujan', 'Dry Season': 'Musim Kemarau' },
            cameraStyle: {
                'Extreme Long Shot': 'Bidikan Sangat Jauh',
                'Long Shot': 'Bidikan Jauh',
                'Full Shot': 'Bidikan Penuh',
                'Medium Long Shot': 'Bidikan Menengah Jauh',
                'Medium Shot': 'Bidikan Menengah',
                'Medium Close-Up': 'Bidikan Dekat Menengah',
                'Close-Up': 'Bidikan Dekat',
                'Extreme Close-Up': 'Bidikan Sangat Dekat'
            },
            cameraMovement: {
                'Pan': 'Pan (Geser Horizontal)',
                'Tilt': 'Tilt (Geser Vertikal)',
                'Dolly': 'Dolly (Maju/Mundur)',
                'Dolly Zoom': 'Dolly Zoom',
                'Tracking': 'Tracking (Mengikuti Objek)',
                'Arc Shot': 'Arc Shot (Gerakan Melingkar)',
                'Drone Shot': 'Drone Shot (Bidikan Drone)',
                'Zoom In': 'Zoom In (Perbesar)',
                'Zoom Out': 'Zoom Out (Perkecil)',
                'Crane Shot': 'Crane Shot (Bidikan Derek)',
                'Handheld': 'Handheld (Genggam)',
                'Steadicam': 'Steadicam',
                'Fixed': 'Fixed (Diam)'
            },
            cameraAngle: {
                'Low Angle': 'Low Angle (Sudut Rendah)',
                'High Angle': 'High Angle (Sudut Tinggi)',
                'Eye Level': 'Eye Level (Setinggi Mata)',
                'Dutch Angle': 'Dutch Angle (Sudut Belanda)',
                'Bird\'s Eye View': 'Bird\'s Eye View (Pandangan Mata Burung)',
                'Worm\'s Eye View': 'Worm\'s Eye View (Pandangan Mata Cacing)',
                'Point of View': 'Point of View (Sudut Pandang)'
            },
            cameraFocus: {
                'Shallow Focus': 'Shallow Focus (Fokus Dangkal)',
                'Deep Focus': 'Deep Focus (Fokus Dalam)',
                'Soft Focus': 'Soft Focus (Fokus Lembut)',
                'Rack Focus': 'Rack Focus (Pergeseran Fokus)',
                'Follow Focus': 'Follow Focus (Mengikuti Fokus)'
            },
            lighting: {
                'Key Light': 'Key Light (Cahaya Utama)',
                'Fill Light': 'Fill Light (Cahaya Pengisi)',
                'Backlight">': 'cklight (Cahaya Latar)',
                'Hard Light': 'Hard Light (Cahaya Keras)',
                'Soft Light': 'Soft Light (Cahaya Lembut)',
                'Side Light': 'Side Light (Cahaya Samping)',
                'Under Light': 'Under Light (Cahaya Bawah)',
                'Motivated Light': 'Motivated Light (Cahaya Termotivasi)'
            },
            colorGrading: { 'Teal & Orange': 'Oranye & Biru Kehijauan', 'Bleach Bypass': 'Pucat & Kontras Tinggi', 'High Saturation': 'Saturasi Tinggi', 'Desaturated': 'Desaturasi / Pudar', 'Monochromatic / Sepia': 'Monokromatik / Sepia', 'Low Contrast': 'Kontras Rendah' },
            dialogueType: { 'No dialogue': 'Tanpa dialog', 'Informative': 'Informatif', 'Natural dialogue': 'Dialog natural', 'Monologue': 'Monolog', 'Interview': 'Wawancara' },
            emotion: { 'Happy': 'Bahagia', 'Sad': 'Sedih', 'Angry': 'Marah', 'Excited': 'Bersemangat', 'Calm': 'Tenang', 'Mysterious': 'Misterius', 'Inspiring': 'Menginspirasi', 'Joyful': 'Gembira', 'Fearful': 'Ketakutan', 'Surprised': 'Terkejut', 'Confused': 'Bingung', 'Determined': 'Bertekad', 'Relaxed': 'Santai' },
            language: { 'English': 'Bahasa Inggris', 'Indonesian': 'Bahasa Indonesia', 'Mandarin': 'Bahasa Mandarin', 'Spanish': 'Bahasa Spanyol', 'French': 'Bahasa Perancis', 'German': 'Bahasa Jerman', 'Japanese': 'Bahasa Jepang', 'Korean': 'Bahasa Korea', 'Arabic': 'Bahasa Arab', 'Russian': 'Bahasa Rusia' },
            videoStyle: { 'Cinematic': 'Sinematik', 'Documentary': 'Dokumenter', 'Animated': 'Animasi', 'Stop Motion': 'Stop Motion', 'Live Action': 'Aksi Nyata', 'Vlog': 'Vlog', 'Music Video': 'Video Musik', 'Experimental': 'Eksperimental', 'Abstract': 'Abstrak', 'Realistic': 'Realistis' },
            gender: { 'Male': 'Laki-laki', 'Female': 'Perempuan', 'Unspecified': 'Tidak Ditentukan' }
        };
        return (translations[type] && translations[type][text]) ? translations[type][text] : text;
    };

    const showMessage = (text, isError = false) => {
        messageEl.textContent = text;
        messageEl.className = `text-center text-sm mb-4 font-medium ${isError ? 'text-red-600' : 'text-green-600'}`;
        setTimeout(() => messageEl.textContent = '', 4000);
    };

    const copyToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showMessage('Disalin!');
        } catch (err) {
            showMessage('Gagal menyalin.', true);
        }
        document.body.removeChild(textArea);
    };

    const createCharacterHTML = () => {
        characterCount++;
        const id = characterCount;
        const characterDiv = document.createElement('div');
        characterDiv.className = 'bg-white bg-opacity-70 p-4 rounded-lg mb-4 border border-purple-300 shadow-sm character-block';
        characterDiv.innerHTML = `
            <h3 class="text-lg font-semibold text-purple-700 mb-3 flex justify-between items-center">
                Karakter ${id}
                <button class="remove-character-btn text-red-600 hover:text-red-800 text-sm font-medium p-1 rounded-full hover:bg-red-100">Hapus</button>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Nama Karakter</label>
                    <input type="text" class="w-full char-name px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white" placeholder="Misal: John Doe" />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Kewarganegaraan</label>
                    <input type="text" class="w-full char-nationality px-4 py-2 border border-purple-300 rounded-lg" placeholder="Misal: Indonesia" />
                </div>
                 <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Usia</label>
                    <input type="text" class="w-full char-age px-4 py-2 border border-purple-300 rounded-lg" placeholder="Misal: 30-an, remaja" />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Jenis Kelamin</label>
                    <select class="w-full char-gender px-4 py-2 border border-purple-300 rounded-lg bg-white">
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="Male">Laki-laki</option>
                        <option value="Female">Perempuan</option>
                        <option value="Unspecified">Tidak Ditentukan</option>
                    </select>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Ciri Fisik Utama</label>
                    <textarea rows="2" class="w-full char-phys-chars px-4 py-2 border border-purple-300 rounded-lg" placeholder="Tinggi, rambut pirang, berkacamata..."></textarea>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Pakaian & Aksesori</label>
                    <textarea rows="2" class="w-full char-clothing px-4 py-2 border border-purple-300 rounded-lg" placeholder="Jas hitam, topi fedora..."></textarea>
                </div>
                 <div class="sm:col-span-2">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Aksi Utama</label>
                    <textarea rows="2" class="w-full char-main-action px-4 py-2 border border-purple-300 rounded-lg" placeholder="Berjalan cepat, melambaikan tangan..."></textarea>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Emosi</label>
                    <textarea rows="2" class="w-full char-emotion px-4 py-2 border border-purple-300 rounded-lg" placeholder="Gembira, sedih, marah..."></textarea>
                </div>
            </div>
        `;
        charactersContainer.appendChild(characterDiv);
        characterDiv.querySelector('.remove-character-btn').addEventListener('click', (e) => {
            e.currentTarget.closest('.character-block').remove()
        });
    };

    const createDialogueHTML = () => {
        dialogueCount++;
        const id = dialogueCount;
        const dialogueDiv = document.createElement('div');
        dialogueDiv.className = 'bg-white p-4 rounded-lg mb-4 border border-teal-300 shadow-sm dialogue-block';

        const characterOptions = Array.from(document.querySelectorAll('.char-name'))
            .map(input => input.value.trim())
            .filter(name => name)
            .map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
            .join('');

        dialogueDiv.innerHTML = `
            <h4 class="text-md font-semibold text-teal-700 mb-2 flex justify-between items-center">
                Dialog ${id}
                <button class="remove-dialogue-btn text-red-600 hover:text-red-800 text-sm font-medium p-1 rounded-full hover:bg-red-100">Hapus</button>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Karakter</label>
                    <select class="w-full dialogue-character px-4 py-2 border border-teal-300 rounded-lg bg-white">
                        <option value="">Pilih Karakter</option>
                        ${characterOptions}
                    </select>
                </div>
                <div> 
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Bahasa</label>
                    <select class="w-full dialogue-language px-4 py-2 border border-teal-300 rounded-lg bg-white">
                        <option value="">Pilih Bahasa</option>
                        <option value="English">English</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="Mandarin">Mandarin</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Russian">Russian</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Mood Suara</label>
                    <select class="w-full dialogue-mood px-4 py-2 border border-teal-300 rounded-lg bg-white">
                        <option value="">Pilih Mood Suara</option>
                        <option value="Happy">Bahagia</option>
                        <option value="Sad">Sedih</option>
                        <option value="Angry">Marah</option>
                        <option value="Excited">Bersemangat</option>
                        <option value="Calm">Tenang</option>
                        <option value="Mysterious">Misterius</option>
                        <option value="Inspiring">Menginspirasi</option>
                        <option value="Joyful">Gembira</option>
                    </select>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Isi Dialog</label>
                    <textarea rows="2" class="w-full dialogue-content px-4 py-2 border border-teal-300 rounded-lg" placeholder="Masukkan isi dialog..."></textarea>
                </div>
            </div>
        `;
        dialoguesContainer.appendChild(dialogueDiv);
        dialogueDiv.querySelector('.remove-dialogue-btn').addEventListener('click', (e) => {
            e.currentTarget.closest('.dialogue-block').remove();
        });
    };

    const getCharactersData = () => {
        return Array.from(document.querySelectorAll('.character-block')).map(div => ({
            name: div.querySelector('.char-name').value,
            nationality: div.querySelector('.char-nationality').value,
            age: div.querySelector('.char-age').value,
            gender: div.querySelector('.char-gender').value,
            physicalCharacteristics: div.querySelector('.char-phys-chars').value,
            clothingAccessories: div.querySelector('.char-clothing').value,
            mainAction: div.querySelector('.char-main-action').value,
            emotion: div.querySelector('.char-emotion').value,
        }));
    };

    const getDialoguesData = () => {
        return Array.from(document.querySelectorAll('.dialogue-block')).map(div => ({
            character: div.querySelector('.dialogue-character').value,
            language: div.querySelector('.dialogue-language').value,
            voiceMood: div.querySelector('.dialogue-mood').value,
            content: div.querySelector('.dialogue-content').value,
        }));
    };

    const setCharactersData = (characters) => {
        charactersContainer.innerHTML = '';
        characterCount = 0;
        if (characters && characters.length > 0) {
            characters.forEach(char => {
                createCharacterHTML();
                const lastCharBlock = charactersContainer.lastElementChild;
                lastCharBlock.querySelector('.char-name').value = char.name || '';
                lastCharBlock.querySelector('.char-nationality').value = char.nationality || '';
                lastCharBlock.querySelector('.char-age').value = char.age || '';
                lastCharBlock.querySelector('.char-gender').value = char.gender || '';
                lastCharBlock.querySelector('.char-phys-chars').value = char.physicalCharacteristics || '';
                lastCharBlock.querySelector('.char-clothing').value = char.clothingAccessories || '';
                lastCharBlock.querySelector('.char-main-action').value = char.mainAction || '';
                lastCharBlock.querySelector('.char-emotion').value = char.emotion || '';
            });
        } else {
            createCharacterHTML(); // Ensure at least one character block exists
        }
    };

    const generatePrompts = (overrides = {}) => {
        outputsContainer.innerHTML = '';

        const currentDescription = overrides.description ?? descriptionEl.value;
        const currentCharacters = overrides.characters ?? getCharactersData();
        const currentLocation = overrides.location ?? locationEl.value;
        const currentTimeOfDay = overrides.timeOfDay ?? timeOfDayEl.value;
        const currentAudioAtmosphereMood = overrides.audioAtmosphereMood ?? audioAtmosphereMoodEl.value;
        const dialogues = getDialoguesData();

        let enPrompt = `Generate a video with the following specifications:\n`;
        if (currentDescription) enPrompt += `- **Overall Description:** ${currentDescription}\n`;
        currentCharacters.forEach((char, index) => {
            if (Object.values(char).some(val => val)) {
                enPrompt += `- **Character ${index + 1}:** ${char.name} (Nationality: ${char.nationality}, Age: ${char.age}, Gender: ${char.gender}). Physical: ${char.physicalCharacteristics}. Clothing: ${char.clothingAccessories}. Action: ${char.mainAction}. Emotion: ${char.emotion}.\n`;
            }
        });
        if (currentLocation || currentTimeOfDay || weatherEl.value || seasonEl.value || currentAudioAtmosphereMood) {
            enPrompt += `- **Setting:** Located in ${currentLocation}. Mood is ${currentAudioAtmosphereMood}. Time: ${currentTimeOfDay}. Weather: ${weatherEl.value}. Season: ${seasonEl.value}.\n`;
        }
        if (cameraStyleEl.value || cameraMovementEl.value || cameraAngleEl.value || cameraFocusEl.value || lightingEl.value || colorGradingEl.value) {
            enPrompt += `- **Camera:** Style: ${cameraStyleEl.value}. Movement: ${cameraMovementEl.value}. Angle: ${cameraAngleEl.value}. Focus: ${cameraFocusEl.value}. Lighting: ${lightingEl.value}. Color: ${colorGradingEl.value}.\n`;
        }
        if (dialogueTypeEl.value || environmentalSoundEl.value || backgroundMusicEl.value) {
            enPrompt += `- **Audio:** Dialogue type: ${dialogueTypeEl.value}. `;
            if (dialogueTypeEl.value && dialogueTypeEl.value !== 'No dialogue') {
                dialogues.forEach((d, i) => { if (d.content) enPrompt += `Dialogue ${i + 1}: By ${d.character} (${d.language}, ${d.voiceMood} mood) says "${d.content}". `; });
            }
            enPrompt += `Sound: ${environmentalSoundEl.value}. Music: ${backgroundMusicEl.value}.\n`;
        }
        if (additionalDetailsEl.value) enPrompt += `- **Additional Notes:** ${additionalDetailsEl.value}\n`;
        if (videoStyleEl.value || videoQualityEl.value || durationEl.value) {
            enPrompt += `- **Video Details:** Style: ${videoStyleEl.value}. Quality: ${videoQualityEl.value}. Duration: ${durationEl.value}.\n`;
        }
        englishPrompt = enPrompt.trim();

        let idPrompt = `Buat video dengan spesifikasi berikut:\n`;
        if (currentDescription) idPrompt += `- **Deskripsi Keseluruhan:** ${currentDescription}\n`;
        currentCharacters.forEach((char, index) => {
            if (Object.values(char).some(val => val)) {
                idPrompt += `- **Karakter ${index + 1}:** ${char.name} (Kewarganegaraan: ${char.nationality}, Usia: ${char.age}, Jenis Kelamin: ${translateToId(char.gender, 'gender')}). Fisik: ${char.physicalCharacteristics}. Pakaian: ${char.clothingAccessories}. Aksi: ${char.mainAction}. Emosi: ${char.emotion}.\n`;
            }
        });
        if (currentLocation || currentTimeOfDay || weatherEl.value || seasonEl.value || currentAudioAtmosphereMood) {
            idPrompt += `- **Latar:** Lokasi di ${currentLocation}. Suasana ${currentAudioAtmosphereMood}. Waktu: ${translateToId(currentTimeOfDay, 'timeOfDay')}. Cuaca: ${translateToId(weatherEl.value, 'weather')}. Musim: ${translateToId(seasonEl.value, 'season')}.\n`;
        }
        if (cameraStyleEl.value || cameraMovementEl.value || cameraAngleEl.value || cameraFocusEl.value || lightingEl.value || colorGradingEl.value) {
            idPrompt += `- **Kamera:** Gaya: ${translateToId(cameraStyleEl.value, 'cameraStyle')}. Gerakan: ${translateToId(cameraMovementEl.value, 'cameraMovement')}. Sudut: ${translateToId(cameraAngleEl.value, 'cameraAngle')}. Fokus: ${translateToId(cameraFocusEl.value, 'cameraFocus')}. Cahaya: ${translateToId(lightingEl.value, 'lighting')}. Warna: ${translateToId(colorGradingEl.value, 'colorGrading')}.\n`;
        }
        if (dialogueTypeEl.value || environmentalSoundEl.value || backgroundMusicEl.value) {
            idPrompt += `- **Audio:** Jenis dialog: ${translateToId(dialogueTypeEl.value, 'dialogueType')}. `;
            if (dialogueTypeEl.value && dialogueTypeEl.value !== 'No dialogue') {
                dialogues.forEach((d, i) => { if (d.content) idPrompt += `Dialog ${i + 1}: Oleh ${d.character} (${translateToId(d.language, 'language')}, mood ${translateToId(d.voiceMood, 'emotion')}) berkata "${d.content}". `; });
            }
            idPrompt += `Suara: ${environmentalSoundEl.value}. Musik: ${backgroundMusicEl.value}.\n`;
        }
        if (additionalDetailsEl.value) idPrompt += `- **Catatan Tambahan:** ${additionalDetailsEl.value}\n`;
        if (videoStyleEl.value || videoQualityEl.value || durationEl.value) {
            idPrompt += `- **Detail Video:** Gaya: ${translateToId(videoStyleEl.value, 'videoStyle')}. Kualitas: ${videoQualityEl.value}. Durasi: ${durationEl.value}.\n`;
        }

        const originalPromptHTML = `
        <div class="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">1. Prompt Asli</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-semibold text-gray-700">Bahasa Inggris</h3>
                        <button data-copy-target="en-original" class="copy-btn bg-gray-500 hover:bg-gray-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                    </div>
                    <pre id="en-original" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(englishPrompt)}</pre>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-semibold text-gray-700">Bahasa Indonesia</h3>
                        <button data-copy-target="id-original" class="copy-btn bg-gray-500 hover:bg-gray-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                    </div>
                    <pre id="id-original" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(idPrompt.trim())}</pre>
                </div>
            </div>
        </div>`;
        outputsContainer.innerHTML = originalPromptHTML;

        optimizeBtn.disabled = !englishPrompt;
        if (overrides.fromGemini) {
            showMessage('✨ Ide berhasil dibuat dan prompt telah diperbarui!');
        } else {
            showMessage('Prompt berhasil dibuat!');
        }
    };

    const callGeminiAPI = async (prompt, schema) => {
        const apiKey = apiKeyEl.value;
        if (!apiKey) {
            showMessage('Harap masukkan Kunci API Gemini Anda.', true);
            return null;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("API Error:", errorBody);
                throw new Error(`API call failed: ${response.status}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                return JSON.parse(result.candidates[0].content.parts[0].text);
            } else {
                console.error("Invalid API response structure:", result);
                throw new Error("Invalid API response structure.");
            }
        } catch (error) {
            console.error("Gemini API Error:", error);
            showMessage("Terjadi kesalahan. Pastikan Kunci API Anda benar dan coba lagi.", true);
            return null;
        }
    };

    const handleQuickIdeation = async () => {
        if (!descriptionEl.value) {
            showMessage('Silakan masukkan ide awal di deskripsi terlebih dahulu.', true);
            return;
        }

        quickIdeationBtn.disabled = true;
        ideationLoader.classList.remove('hidden');

        const prompt = `Based on the simple idea "${descriptionEl.value}", expand this into a more detailed and creative video concept. Brainstorm a more descriptive "Overall Description", suggest one or two "Characters" with their "main actions" and "emotions", a "Location", a "Time of Day", and a "Mood/Atmosphere". Keep the concepts concise and suitable for a short video prompt. Return this as a JSON object with the specified schema.`;
        const schema = {
            type: "OBJECT",
            properties: {
                "description": { "type": "STRING" },
                "characters": { "type": "ARRAY", items: { type: "OBJECT", properties: { "name": { "type": "STRING" }, "mainAction": { "type": "STRING" }, "emotion": { "type": "STRING" } } } },
                "location": { "type": "STRING" },
                "timeOfDay": { "type": "STRING" },
                "mood": { "type": "STRING" },
            }
        };

        const idea = await callGeminiAPI(prompt, schema);

        if (idea) {
            descriptionEl.value = idea.description || descriptionEl.value;
            locationEl.value = idea.location || '';
            timeOfDayEl.value = idea.timeOfDay || '';
            audioAtmosphereMoodEl.value = idea.mood || '';
            setCharactersData(idea.characters);

            generatePrompts({ fromGemini: true });
        }

        quickIdeationBtn.disabled = false;
        ideationLoader.classList.add('hidden');
    };

    const handleOptimizePrompt = async () => {
        if (!englishPrompt) {
            showMessage('Harap buat prompt dasar terlebih dahulu sebelum mengoptimalkan.', true);
            return;
        }

        optimizeBtn.disabled = true;
        optimizeBtn.innerHTML = '<span class="loader"></span>Mengoptimalkan...';

        const optimizationPrompt = `You are a creative director and expert prompt engineer for text-to-video AI models. Your task is to analyze a video prompt and enhance it in several ways.

            Based on the following original prompt, perform these four tasks:
            1.  **Optimize Prompt (English):** Rewrite the English prompt to be significantly more descriptive, evocative, and cinematic. Add specific details about lighting, textures, camera angles, movement, and atmosphere. Maintain the core concepts but elevate the language.
            2.  **Translate Optimized Prompt (Indonesian):** Translate the newly optimized English prompt from step 1 into natural-sounding, fluent Indonesian.
            3.  **Provide Creative Suggestions:** As a creative director, provide a separate list of "Suggestions and Additional Details" to make the video even more compelling. These are ideas that go beyond the original prompt. Provide these suggestions in both English and Indonesian.
            4.  **Create Final Optimized Prompt from Suggestions (English & Indonesian):** Take the "Creative Suggestions" from step 3 and synthesize them with the original prompt's core idea to create a *final, ultimate cinematic prompt*. This should be the most detailed and imaginative version. Provide this final version in both English and Indonesian.

            Return the result as a single JSON object with the specified schema.

            Original English Prompt:
            ---
            ${englishPrompt}
            ---
        `;
        const schema = {
            type: "OBJECT",
            properties: {
                "optimized_english": { "type": "STRING" },
                "optimized_indonesian": { "type": "STRING" },
                "english_suggestions": { "type": "STRING" },
                "indonesian_suggestions": { "type": "STRING" },
                "final_optimized_english": { "type": "STRING" },
                "final_optimized_indonesian": { "type": "STRING" }
            },
            required: ["optimized_english", "optimized_indonesian", "english_suggestions", "indonesian_suggestions", "final_optimized_english", "final_optimized_indonesian"]
        };

        const optimizedData = await callGeminiAPI(optimizationPrompt, schema);

        if (optimizedData) {
            let allOptimizedHtml = '';

            allOptimizedHtml += `
           <div class="p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-inner">
                <h2 class="text-2xl font-bold text-blue-700 text-center mb-4">2. Versi Optimasi</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-blue-800">Bahasa Inggris</h3>
                            <button data-copy-target="en-optimized" class="copy-btn bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                        </div>
                        <pre id="en-optimized" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(optimizedData.optimized_english)}</pre>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-blue-800">Bahasa Indonesia</h3>
                             <button data-copy-target="id-optimized" class="copy-btn bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                        </div>
                        <pre id="id-optimized" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(optimizedData.optimized_indonesian)}</pre>
                    </div>
                </div>
           </div>`;

            allOptimizedHtml += `
           <div class="p-6 bg-purple-50 rounded-xl border border-purple-200 shadow-inner">
                <h2 class="text-2xl font-bold text-purple-700 text-center mb-4">💡 3. Saran Kreatif dari Gemini 💡</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-purple-800">Bahasa Inggris</h3>
                            <button data-copy-target="en-suggestions" class="copy-btn bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                        </div>
                        <pre id="en-suggestions" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(optimizedData.english_suggestions)}</pre>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-purple-800">Bahasa Indonesia</h3>
                             <button data-copy-target="id-suggestions" class="copy-btn bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                        </div>
                        <pre id="id-suggestions" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(optimizedData.indonesian_suggestions)}</pre>
                    </div>
                </div>
           </div>`;

            allOptimizedHtml += `
           <div class="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 shadow-inner">
                <h2 class="text-2xl font-bold text-green-700 text-center mb-4">✨ 4. Prompt Sinematik Final ✨</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-green-800">Bahasa Inggris</h3>
                            <button data-copy-target="en-final" class="copy-btn bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                        </div>
                        <pre id="en-final" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(optimizedData.final_optimized_english)}</pre>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-green-800">Bahasa Indonesia</h3>
                             <button data-copy-target="id-final" class="copy-btn bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-3 rounded-md">Salin</button>
                        </div>
                        <pre id="id-final" class="whitespace-pre-wrap break-words p-4 bg-white rounded-lg border border-gray-300 text-gray-800 text-sm max-h-72 overflow-auto custom-scrollbar">${escapeHtml(optimizedData.final_optimized_indonesian)}</pre>
                    </div>
                </div>
           </div>`;

            outputsContainer.innerHTML += allOptimizedHtml;
            showMessage('✅ Prompt berhasil dioptimalkan!');
        }

        optimizeBtn.disabled = false;
        optimizeBtn.textContent = 'Optimalkan dengan Gemini';
    };

    // --- Event Listeners ---
    addCharacterBtn.addEventListener('click', createCharacterHTML);
    addDialogueBtn.addEventListener('click', createDialogueHTML);
    generateBtn.addEventListener('click', () => generatePrompts());
    quickIdeationBtn.addEventListener('click', handleQuickIdeation);
    optimizeBtn.addEventListener('click', handleOptimizePrompt);

    dialogueTypeEl.addEventListener('change', () => {
        if (dialogueTypeEl.value && dialogueTypeEl.value !== 'No dialogue') {
            dialoguesSection.classList.remove('hidden');
        } else {
            dialoguesSection.classList.add('hidden');
        }
    });

    outputsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
            const targetId = e.target.dataset.copyTarget;
            const preElement = document.getElementById(targetId);
            if (preElement) {
                copyToClipboard(preElement.innerText);
            }
        }
    });

    // --- Initial State ---
    createCharacterHTML(); // Start with one character block
});
