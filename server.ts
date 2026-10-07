import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Generate Horror Movie Structure
app.post('/api/movie/generate', async (req: Request, res: Response) => {
  try {
    const { title, idea, location, genre, tone, runtime } = req.body;

    if (!idea || typeof idea !== 'string') {
      res.status(400).json({ error: 'Movie idea description is required.' });
      return;
    }

    const prompt = `You are an elite Hollywood horror film producer, showrunner, and auteur screenplay architect.
Generate a comprehensive, original, structured horror movie project titled WHISPER Dossier based on this premise:

User Pitch / Idea: "${idea}"
Provided Title: "${title || 'Generate a compelling, haunting title'}"
Location: "${location || ' Atmospheric horror setting tailored to the idea'}"
Genre: "${genre || 'Psychological Horror'}"
Tone: "${tone || 'Terrifying & Cinematic'}"
Target Runtime: "${runtime || '95 minutes'}"

STRICT GUIDELINES:
1. Make the writing professional Hollywood tier (like Ari Aster, Robert Eggers, John Krasinski, Jordan Peele, or Mike Flanagan).
2. Avoid copying existing copyrighted movies, characters, or franchises. Craft original lore, original monsters/psychological threats, and authentic human drama.
3. Emphasize dread, atmosphere, silence vs acoustic shock, distinct character vulnerabilities, and unbreakable rules of the horror.
4. Provide 5 detailed cinematic scenes that form the narrative backbone.
5. All fields must be richly fleshed out with vivid cinematic details.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are WHISPER, the world-class horror movie architectural engine. Always respond in valid, meticulously structured JSON according to the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'The title of the horror movie' },
            tagline: { type: Type.STRING, description: 'A punchy, memorable, chilling tagline' },
            logline: { type: Type.STRING, description: 'A high-concept 1-2 sentence dramatic logline' },
            synopsis: { type: Type.STRING, description: 'Comprehensive 2-3 paragraph film synopsis detailing premise, stakes, and narrative arc' },
            genre: { type: Type.STRING },
            tone: { type: Type.STRING },
            location: { type: Type.STRING },
            runtime: { type: Type.STRING },
            rulesOfHorror: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '4-5 immutable survival/curse rules (e.g., sound triggers, time windows, sight laws)'
            },
            mainThreat: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                classification: { type: Type.STRING, description: 'e.g., Acoustic Spectral Parasite, Somatic Mimic, Subterranean Apex Predator' },
                description: { type: Type.STRING },
                huntingMethod: { type: Type.STRING },
                fatalVulnerabilityOrMystery: { type: Type.STRING }
              },
              required: ['name', 'classification', 'description', 'huntingMethod', 'fatalVulnerabilityOrMystery']
            },
            setting: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                atmosphericDescription: { type: Type.STRING },
                dreadFactors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                sensoryDetails: { type: Type.STRING }
              },
              required: ['name', 'atmosphericDescription', 'dreadFactors', 'sensoryDetails']
            },
            characters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  archetype: { type: Type.STRING },
                  background: { type: Type.STRING },
                  fatalFlaw: { type: Type.STRING },
                  relationshipDynamics: { type: Type.STRING },
                  survivalOdds: { type: Type.STRING },
                  actorInspiration: { type: Type.STRING }
                },
                required: ['id', 'name', 'role', 'archetype', 'background', 'fatalFlaw', 'relationshipDynamics', 'survivalOdds']
              }
            },
            act1: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                setup: { type: Type.STRING },
                incitingIncident: { type: Type.STRING },
                plotPoint1: { type: Type.STRING },
                turningPoint: { type: Type.STRING }
              },
              required: ['title', 'setup', 'incitingIncident', 'plotPoint1', 'turningPoint']
            },
            act2: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                risingTension: { type: Type.STRING },
                midpointRevelation: { type: Type.STRING },
                climaxOfDespair: { type: Type.STRING },
                allIsLostMoment: { type: Type.STRING }
              },
              required: ['title', 'risingTension', 'midpointRevelation', 'climaxOfDespair', 'allIsLostMoment']
            },
            act3: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                climaxConfrontation: { type: Type.STRING },
                costOfSurvival: { type: Type.STRING },
                ending: { type: Type.STRING },
                finalShot: { type: Type.STRING }
              },
              required: ['title', 'climaxConfrontation', 'costOfSurvival', 'ending', 'finalShot']
            },
            ending: { type: Type.STRING, description: 'Chilling concluding summary with lingering dread' },
            keyQuotes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  character: { type: Type.STRING },
                  quote: { type: Type.STRING },
                  context: { type: Type.STRING }
                },
                required: ['character', 'quote', 'context']
              }
            },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  slugline: { type: Type.STRING },
                  title: { type: Type.STRING },
                  intensity: { type: Type.INTEGER, description: 'Tension scale from 1 to 10' },
                  actionDescription: { type: Type.STRING },
                  dialogueSnippet: { type: Type.STRING },
                  soundDesignCue: { type: Type.STRING, description: 'Silence vs sound design, acoustic shocks, ambient audio' },
                  cameraDirection: { type: Type.STRING, description: 'Framing, camera motion, lens choice, lighting direction' },
                  visualPrompt: { type: Type.STRING, description: 'Text prompt optimized for generating storyboard visual art' }
                },
                required: ['sceneNumber', 'slugline', 'title', 'intensity', 'actionDescription', 'dialogueSnippet', 'soundDesignCue', 'cameraDirection', 'visualPrompt']
              }
            },
            prologueNarration: { type: Type.STRING, description: 'Opening cold-open whisper/monologue voiceover' },
            epilogueNarration: { type: Type.STRING, description: 'Chilling final closing voiceover' },
            directorNotes: {
              type: Type.OBJECT,
              properties: {
                colorPalette: { type: Type.STRING },
                cinematographyStyle: { type: Type.STRING },
                soundPhilosophy: { type: Type.STRING },
                comparativeFilms: { type: Type.STRING }
              },
              required: ['colorPalette', 'cinematographyStyle', 'soundPhilosophy', 'comparativeFilms']
            }
          },
          required: [
            'title', 'tagline', 'logline', 'synopsis', 'genre', 'tone', 'location', 'runtime',
            'rulesOfHorror', 'mainThreat', 'setting', 'characters', 'act1', 'act2', 'act3',
            'ending', 'keyQuotes', 'scenes', 'prologueNarration', 'epilogueNarration', 'directorNotes'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    const finalMovie = {
      id: `movie_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      ...parsed
    };

    res.json({ success: true, movie: finalMovie });
  } catch (error: any) {
    console.error('Error generating movie:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate horror movie.' });
  }
});

// Endpoint: Generate Full Hollywood Screenplay Scene
app.post('/api/movie/scene-script', async (req: Request, res: Response) => {
  try {
    const { movieTitle, scene, characters } = req.body;

    if (!scene) {
      res.status(400).json({ error: 'Scene information is required.' });
      return;
    }

    const prompt = `Write a complete, authentic Hollywood screenplay scene for the horror movie "${movieTitle}".

SCENE OVERVIEW:
Scene Number: ${scene.sceneNumber}
Slugline: ${scene.slugline}
Title: ${scene.title}
Action Context: ${scene.actionDescription}
Sound Design: ${scene.soundDesignCue}
Camera Direction: ${scene.cameraDirection}
Available Characters: ${JSON.stringify(characters || [])}

SCREENPLAY FORMATTING INSTRUCTIONS:
- Write strictly in classic screenwriting format.
- Include scene heading (SLUGLINE in ALL CAPS).
- Evocative, present-tense action descriptions focusing on silence, shadows, visceral terror, and dread.
- Character names centered in ALL CAPS above dialogue with optional parentheticals (e.g. (whispering), (gasping), (barely audible)).
- Sound cues formatted in ALL CAPS (e.g. A FLOORBOARD CREAKS. THE HUM OF THE VENT DIES.).
- Deliver gripping, tension-packed dialogue with long pregnant silences.
- Length: approximately 2 to 3 pages worth of high-tension screenplay text (around 400-800 words).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a veteran Hollywood horror screenwriter. Output the formatted screenplay scene as clean text with standard formatting.',
      }
    });

    res.json({ success: true, script: response.text });
  } catch (error: any) {
    console.error('Error generating scene script:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate screenplay scene.' });
  }
});

// Endpoint: Refine Movie with AI
app.post('/api/movie/refine', async (req: Request, res: Response) => {
  try {
    const { movie, instruction, targetSection } = req.body;

    if (!movie || !instruction) {
      res.status(400).json({ error: 'Movie and refinement instruction are required.' });
      return;
    }

    const prompt = `You are refining an existing horror movie dossier for the movie "${movie.title}".

CURRENT MOVIE DATA:
${JSON.stringify(movie, null, 2)}

USER INSTRUCTION FOR REFINEMENT:
"${instruction}"
Target Section Focus: ${targetSection || 'Whole movie or relevant areas'}

Task: Update and enhance the horror movie dossier according to the user instruction. Return the complete updated movie object with the exact same JSON structure. Maintain consistency across characters, plot beats, and tone.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are WHISPER refinement engine. Always return the complete updated movie object in valid JSON matching the original schema structure.',
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    const updatedMovie = {
      ...movie,
      ...parsed,
      updatedAt: new Date().toISOString()
    };

    res.json({ success: true, movie: updatedMovie });
  } catch (error: any) {
    console.error('Error refining movie:', error);
    res.status(500).json({ error: error?.message || 'Failed to refine horror movie.' });
  }
});

// Configure Vite integration
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`WHISPER Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
