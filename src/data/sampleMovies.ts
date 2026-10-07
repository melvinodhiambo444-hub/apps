import { Movie } from '../types/movie';

export const SAMPLE_MOVIES: Movie[] = [
  {
    id: 'sample_decibel_protocol',
    title: 'THE DECIBEL PROTOCOL',
    tagline: 'Pray they hear nothing. Breathe, and you die.',
    logline: 'In a blackout-stricken metropolis overrun by subterranean blind horrors tuned to acoustic vibration, a guilt-ridden sound designer and an estranged trauma surgeon must navigate a dead city where any sound above 20 decibels triggers instantaneous slaughter.',
    synopsis: 'When a tectonic seismic survey accidentally fractures a prehistoric subterranean fault beneath Chicago, thousands of hyper-sensitive apex predators known as "The Resonators" swarm the surface. Possessing no ocular organs but acoustic membranes that perceive air tremors down to human heartbeats, they turn the urban grid into a cemetery.\n\nAudio engineer Marcus Vance, holed up in a soundproof broadcast studio with his custom decibel monitoring equipment, discovers the creatures are not just hunting sound—they are converging on the city\'s emergency sirens. When stranded paramedic Maya Lin breaks into the studio carrying a severed acoustic organ that emits a neutralizing counter-frequency, they realize they have one desperate window: reverse the broadcast array at the central radio tower before dawn to blind the horde.\n\nAs the perimeter fails and soundproofing dissolves, every breath, heartbeat, and misstep becomes a lethal countdown.',
    genre: 'Creature Horror',
    tone: 'Suspenseful',
    location: 'Blackout-Stricken Chicago Metropolitan Grid',
    runtime: '95 minutes',
    rulesOfHorror: [
      'Any sound exceeding 20 decibels summons them in under 12 seconds.',
      'They do not bleed; vibration echo-locates bone and vital organs through concrete.',
      'Masking sound with white noise only works if the speaker remains totally motionless.',
      'When the air drops 10 degrees in temperature, a pack is within striking perimeter.'
    ],
    mainThreat: {
      name: 'The Resonators',
      classification: 'Subterranean Blind Bio-Acoustic Predators',
      description: 'Quadrupedal chimeric horrors with translucent skin, needle-like chitinous limbs, and concussive cranial chambers that act like biological tuning forks.',
      huntingMethod: 'They triangulate kinetic vibration with millisecond precision, impaling their prey before acoustic shockwaves subside.',
      fatalVulnerabilityOrMystery: 'High-frequency harmonic resonance cascades overwhelm their cranial receptors, inducing catastrophic neural seizure.'
    },
    setting: {
      name: 'The Dead City & Soundproof Studio 4B',
      atmosphericDescription: 'Rain slicks silent asphalt beneath towering abandoned skyscrapers. Streetlights hum faintly on dying battery grids. The city is a crypt of muted footsteps, broken glass wrapped in cloth, and silent terror.',
      dreadFactors: [
        'Floors littered with debris where a single dropped key is a death sentence.',
        'Rainstorms creating unpredictable noise interference that drives the monsters into frenzy.',
        'Emergency automated alarms that could trigger at any random power surge.'
      ],
      sensoryDetails: 'The muffled thud of a racing pulse inside your own eardrums; the wet, rhythmic clicking of claws on wet asphalt outside.'
    },
    characters: [
      {
        id: 'c1',
        name: 'Marcus Vance',
        role: 'Protagonist / Acoustic Engineer',
        archetype: 'The Reluctant Technician',
        background: 'Former film audio mixer obsessed with decibel meters who lost his family during the initial eruption due to a dropped pan.',
        fatalFlaw: 'Paralyzing fear of taking physical action; over-relies on monitors rather than trusting gut instinct.',
        relationshipDynamics: 'Mistrustful of Maya\'s aggressive survival tactics, but dependent on her anatomical knowledge.',
        survivalOdds: '40% - Moderate Risk',
        actorInspiration: 'Steven Yeun'
      },
      {
        id: 'c2',
        name: 'Dr. Maya Lin',
        role: 'Surgeon & Field Paramedic',
        archetype: 'The Pragmatic Survivor',
        background: 'Trauma surgeon who witnessed the initial hospital collapse and extracted an intact acoustic gland from an early specimen.',
        fatalFlaw: 'Suppresses physical exhaustion and pain; hides an infected puncture wound from Marcus.',
        relationshipDynamics: 'Pushes Marcus to stop hiding and weaponize his sound studio equipment.',
        survivalOdds: '60% - High Resilience',
        actorInspiration: 'Jessica Henwick'
      },
      {
        id: 'c3',
        name: 'Frankie "Wire" Cobb',
        role: 'The Displaced Electrician',
        archetype: 'The Wildcard Catalyst',
        background: 'Underground transit worker surviving in subway utility tunnels, driven half-mad by tinnitus.',
        fatalFlaw: 'Prone to sudden panic attacks and uncontrollable vocal gasps.',
        relationshipDynamics: 'Volatile dependent; views Marcus as an acoustic savior but triggers unintentional noise spikes.',
        survivalOdds: '15% - Extremely Vulnerable',
        actorInspiration: 'Willem Dafoe'
      }
    ],
    act1: {
      title: 'The Silent Grid',
      setup: 'Marcus operates in absolute silence inside broadcast booth 4B, tracking decibel readings across empty Chicago streets on an analog oscilloscope.',
      incitingIncident: 'A dying emergency backup generator blows a fuse on the lower concourse, creating an 85dB sonic blast that summons three Resonators right outside his vault door.',
      plotPoint1: 'Maya slips through the service hatch holding a pressurized cooler containing the dissected acoustic gland, begging for access before the pack tears down the steel partition.',
      turningPoint: 'Marcus opens the vacuum airlock just as the first creature punches through the steel vent, sealing them both inside but trapping them in a ticking bunker.'
    },
    act2: {
      title: 'The Frequency of Flesh',
      risingTension: 'Analyzing the dissected gland, Marcus discovers the frequency that causes the specimen\'s tissue to violently spasm. However, they need the 50,000-watt transmitter at the broadcast summit.',
      midpointRevelation: 'Frankie joins them through the maintenance conduit with horrific news: the city\'s automated flood alarms are scheduled to test-fire at dawn. The entire city will become an echo chamber of slaughter unless disarmed.',
      climaxOfDespair: 'While traversing the flooded subterranean subway concourse, Frankie slips on an algae pipe. His scream registers at 78 decibels. A Resonator drops instantly from the ceiling arch.',
      allIsLostMoment: 'Marcus and Maya are forced to seal the blast door, listening to Frankie being torn apart in the dark while holding their own breaths until their ribs ache.'
    },
    act3: {
      title: 'The Final Broadcast',
      climaxConfrontation: 'Reaching the broadcast tower antenna deck during a torrential downpour, Marcus calibrates the soundboard while Maya holds off two stalking alphas using magnesium flare decoys.',
      costOfSurvival: 'Maya sacrifices the acoustic gland directly into the microwave transducer, shattering her eardrums from point-blank kinetic kickback.',
      ending: 'Marcus keys the microphone and drives the amplifier gain past the redline. The feedback squeal shatters every glass pane in a two-mile radius, detonating the cranial cavities of the swarm in a synchronized spray of black fluid.',
      finalShot: 'Sunlight breaks over Lake Michigan in dead, absolute silence. Marcus and Maya sit against the transmission console, deafened, as the silent city breathes for the first time in weeks.'
    },
    ending: 'The silence that once brought death becomes the canvas of their salvation, though neither survivor will ever hear a human voice again.',
    keyQuotes: [
      {
        character: 'Marcus Vance',
        quote: 'Do not swallow. Do not cry. In this room, your pulse is an invitation.',
        context: 'Warning Maya as a Resonator presses its snout against the acoustic double-glass.'
      },
      {
        character: 'Dr. Maya Lin',
        quote: 'We spent centuries filling the world with noise. Now the dark wants it all back.',
        context: 'Examining the harvested creature organ in the dimly lit sound room.'
      }
    ],
    scenes: [
      {
        sceneNumber: 1,
        slugline: 'INT. BROADCAST STUDIO 4B - 03:14 AM',
        title: 'The Zero Decibel Baseline',
        intensity: 6,
        actionDescription: 'Marcus sits in near total darkness. A digital decibel meter glows blood-red: "14.2 dB". He peels an orange using surgical precision, stripping the rind without tearing the membrane.',
        dialogueSnippet: 'MARCUS (barely audible whisper):\nFourteen. Three decibels under threshold. Hold it.',
        soundDesignCue: 'Absolute silence. Only the sound of Marcus\'s slow nasal inhalations and the faint mechanical click of the meter diode.',
        cameraDirection: 'Extreme macro close-up on the digital LED digits flickering between 14.1 and 14.8, panning slowly to Marcus\'s dilated pupil.',
        visualPrompt: 'Cinematic horror film still, close-up of a terrified man in a dark broadcast studio illuminated only by a red glowing digital decibel meter displaying 14.2 dB, 35mm film grain, deep shadows, Panavision framing.'
      },
      {
        sceneNumber: 2,
        slugline: 'EXT. MICHIGAN AVENUE - CONTINUOUS',
        title: 'The Dropped Wrench',
        intensity: 9,
        actionDescription: 'A scavenger fifty yards down the deserted avenue drops a steel wrench onto wet concrete. The clatter rings out like a gunshot in the dead silence.',
        dialogueSnippet: 'SCAVENGER (silent mouthing):\nNo. God, no.',
        soundDesignCue: 'High-pitch ringing metallic clink, followed by 3 seconds of sickening silence. Then a concussive shockwave of air rushing down the street.',
        cameraDirection: 'Wide anamorphic angle looking down the foggy boulevard as shadows on three adjacent building walls detach and hurtle downward.',
        visualPrompt: 'Cinematic horror wide shot of foggy deserted Chicago street at night, wet asphalt, three monstrous chitinous shadow beasts dropping from skyscrapers toward a solitary fleeing human, cinematic red streetlight tint.'
      },
      {
        sceneNumber: 3,
        slugline: 'INT. SUBWAY CONDUIT PIPE - NIGHT',
        title: 'The Throat Clamp',
        intensity: 8,
        actionDescription: 'Marcus, Maya, and Frankie crouch shoulder to shoulder inside a 36-inch concrete drainage pipe. Above them, needle-sharp claws scrape rhythmically against corrugated steel.',
        dialogueSnippet: 'MAYA (silent whisper, lips against Marcus\'s ear):\nFrankie is hyperventilating. Look at his chest.',
        soundDesignCue: 'The wet scraping of bone on metal. A faint, shuddering whistle of Frankie\'s choked windpipe fighting for oxygen.',
        cameraDirection: 'Low-angle claustrophobic shot, rim-lit by a faint dying red emergency bulb, shallow depth of field focusing on trembling sweat drops.',
        visualPrompt: 'Claustrophobic cinematic horror still of three terrified survivors huddled inside a dark concrete pipe, one person clamping a hand over another\'s mouth to stop screams, dim red emergency light, hyper-detailed sweat and terror.'
      },
      {
        sceneNumber: 4,
        slugline: 'INT. SOUND LAB - 05:22 AM',
        title: 'The Harmonic Scalpel',
        intensity: 7,
        actionDescription: 'Maya pins the harvested acoustic organ to an aluminum dissection tray while Marcus routes an analog synthesizer patch cable through an oscilloscope.',
        dialogueSnippet: 'MARCUS (whispering):\nWatch the wave. At 18,400 Hertz, the cellular walls tear themselves apart.',
        soundDesignCue: 'Sub-audible bass rumble that vibrates the viewer\'s chest, sweeping into an unbearable ultrasonic whine.',
        cameraDirection: 'Overhead tracking shot of the twitching black organ reacting violently to the audio oscilloscope beam.',
        visualPrompt: 'Dark scientific horror cinematic still, an alien bio-acoustic organ pinned on a stainless steel dissection tray glowing with ultrasonic vibrations, vintage analog oscilloscope in background displaying erratic red sine waves.'
      },
      {
        sceneNumber: 5,
        slugline: 'EXT. BROADCAST TRANSMITTER TOWER - DAWN',
        title: 'The Deafening Dawn',
        intensity: 10,
        actionDescription: 'On the windswept radio tower catwalk 600 feet above the city, the alpha Resonator corners Marcus against the master breaker. Marcus jams the audio feed directly into the high-voltage relay.',
        dialogueSnippet: 'MARCUS (screaming at full volume for the first time):\nHear this!',
        soundDesignCue: 'A deafening wall of acoustic feedback that instantly cuts to absolute dead silence as Marcus\'s eardrums rupture.',
        cameraDirection: 'Handheld Dutch angle tracking the beast as its skull explodes in harmonic resonance against the backdrop of the rising red sun.',
        visualPrompt: 'Cinematic climax still of a horror film, atop a skyscraper transmission tower at bloody dawn, a monstrous blind creature shrieking in agony from audio shockwaves, cinematic lighting, 8k resolution.'
      }
    ],
    prologueNarration: 'Before the world learned to scream, it learned to whisper. We thought silence was peace. We were wrong. Silence is the cage. And the key was taken long before we were born.',
    epilogueNarration: 'If you are listening to this on a dead wire, know this: we survived the night. But remember the law of the new world. When the silence falls... do not dare to fill it.',
    directorNotes: {
      colorPalette: 'Deep charcoal blacks (#0a0a0c), cold steel cyan (#1e293b), punctuated by incandescent flare crimson (#dc2626).',
      cinematographyStyle: 'Panavision anamorphic 2.39:1, slow deliberate dolly moves that build unbearable anticipation, paired with claustrophobic macro close-ups.',
      soundPhilosophy: 'Subtractive sound design: strip away musical score during tension beats to force the audience to hear their own breathing.',
      comparativeFilms: 'A Quiet Place meets The Descent and Chernobyl.'
    },
    createdAt: '2026-10-06T12:00:00.000Z'
  },
  {
    id: 'sample_hollow_spire',
    title: 'THE HOLLOW SPIRE',
    tagline: 'Some confessions should never be given voice.',
    logline: 'An architectural restorer investigating an abandoned mountain sanatorium discovers an ominous acoustic confession booth designed to amplify repressed psychological guilt into a physical entity that feeds on silence.',
    synopsis: 'In 1948, the remote Alpine Sanatorium of Saint Jude was sealed following a mass disappearance of physicians and patients. Seventy years later, architectural conservator Elena Cruz is hired by an anonymous foundation to survey the deteriorating chapel.\n\nUpon entering the central octagonal rotunda, Elena discovers a bizarre confessional chamber constructed entirely of resonance-trapping acoustic pumice and obsidian mirrors. Local folklore warned that the sanatorium doctor used the chamber to extract patients\' deepest psychological shame through guided hypnosis.\n\nAs snowfall traps Elena inside with a damaged radio, she realizes the architecture is alive: the stone remembers every confession ever whispered into its walls, and it requires a fresh confession each night at midnight—or it begins mimicking the voices of those she loved and lost.',
    genre: 'Psychological Horror',
    tone: 'Dark',
    location: 'Alpine Sanatorium of Saint Jude, Swiss Alps',
    runtime: '110 minutes',
    rulesOfHorror: [
      'The Rotunda records every whispered secret; speak no falsehood in its presence.',
      'At 12:00 AM, the confessional must receive a true confession, or the shadows step out.',
      'Cover all reflective surfaces; mirrors in this place show what is listening behind you.',
      'Never answer if a voice calls your name from behind a closed heavy door.'
    ],
    mainThreat: {
      name: 'The Echo of Saint Jude',
      classification: 'Architectural Psychological Entity / Voice Parasite',
      description: 'A shadowy, shifting entity formed from decades of agonizing whispers and acoustic resonance trapped inside porous volcanic stone.',
      huntingMethod: 'Mimics the voices of the protagonist\'s deceased sister to induce psychological collapse and voluntary surrender.',
      fatalVulnerabilityOrMystery: 'Total silence of the mind: it has no power over truths accepted without shame or guilt.'
    },
    setting: {
      name: 'Saint Jude Alpine Sanatorium',
      atmosphericDescription: 'Gothic architecture meeting mid-century brutalist stone. Flurries of snow drift through broken stained glass into long vaulted corridors lined with empty patient beds.',
      dreadFactors: [
        'A blizzard that cuts off power and road access for 72 hours.',
        'Rooms with anomalous acoustic geometry where whispers carry across 500 feet of empty stone.',
        'Frozen patient records with missing teeth and cut tongues.'
      ],
      sensoryDetails: 'The bitter smell of frozen mold, wet wool, and the faint scent of sulfur whenever an echo speaks.'
    },
    characters: [
      {
        id: 'c1',
        name: 'Elena Cruz',
        role: 'Protagonist / Architectural Conservator',
        archetype: 'The Haunted Scholar',
        background: 'Expert in historical acoustic architecture suffering from survivor guilt following her younger sister\'s drowning.',
        fatalFlaw: 'Desperately seeks redemption and clings to irrational hope of hearing her sister again.',
        relationshipDynamics: 'Isolated; speaks only via intermittent satellite phone to her sponsor.',
        survivalOdds: '35% - High Psychological Risk',
        actorInspiration: 'Florence Pugh'
      },
      {
        id: 'c2',
        name: 'Father Michael Byrne',
        role: 'Vatican Archivist (Voice on Satellite Phone)',
        archetype: 'The Cryptic Informant',
        background: 'An elderly archivist who knows the classified history of the 1948 incident.',
        fatalFlaw: 'Withholds critical information to preserve church doctrine.',
        relationshipDynamics: 'Elena\'s only lifeline to the outside world, though his motives are suspect.',
        survivalOdds: '90% - Remote Non-Combatant',
        actorInspiration: 'Ciarán Hinds'
      }
    ],
    act1: {
      title: 'The Stone Confessional',
      setup: 'Elena sets up laser scanning equipment in the frosted rotunda of Saint Jude, documenting the impossible acoustic curvature of the masonry.',
      incitingIncident: 'Her audio recording gear captures a child\'s whisper speaking her dead sister\'s private childhood nickname.',
      plotPoint1: 'A blizzard hits early, collapsing the chapel portico and burying the only road down the mountain.',
      turningPoint: 'Elena finds the hidden door behind the altar leading to the subterranean acoustic labyrinth.'
    },
    act2: {
      title: 'The Architecture of Guilt',
      risingTension: 'Each night at midnight, the temperature plummets and the walls begin weeping dark condensation that forms words of confession.',
      midpointRevelation: 'Elena discovers the 1948 journal: the doctors did not go missing; they sealed themselves in the walls to feed the entity their dying secrets.',
      climaxOfDespair: 'Elena sees her sister sitting inside the obsidian confessional booth, beckoning her to step inside and apologize for the lake.',
      allIsLostMoment: 'The satellite phone battery dies right as Father Byrne warns her that the voice she is talking to is not him.'
    },
    act3: {
      title: 'The Absolution',
      climaxConfrontation: 'Elena enters the central chamber with an iron mallet and acoustic charges, confronting the shadow manifested from her own suppressed memories.',
      costOfSurvival: 'She shatters the obsidian focal mirror, suffering deep lacerations but breaking the resonance feedback loop.',
      ending: 'The rotunda begins to collapse under the acoustic shock. Elena crawls into the sub-zero snowstorm as the spire falls into the ravine.',
      finalShot: 'Elena shivering in the morning snow. As rescue helicopters circle above, she whispers her own name—and hears nothing return.'
    },
    ending: 'She escapes the mountain alive, but leaves her guilt buried beneath 400 tons of shattered Gothic stone.',
    keyQuotes: [
      {
        character: 'The Echo',
        quote: 'You didn\'t drop the rope, Elena. You let go on purpose.',
        context: 'Whispered from the dark confessional grille at 12:01 AM.'
      }
    ],
    scenes: [
      {
        sceneNumber: 1,
        slugline: 'INT. ROTUNDA - DUSK',
        title: 'The First Resonance',
        intensity: 5,
        actionDescription: 'Elena activates the 3D laser scanner. The green laser grid pulses across the obsidian confessional. Suddenly, the mic feedback spikes with a breathy murmur.',
        dialogueSnippet: 'ELENA:\nCheck one. Sanatorium chapel acoustics test.\nVOICE (through headphones):\n...Elena...',
        soundDesignCue: 'Cold ambient wind outside, suddenly silenced. A crisp, intimate whisper sounding inches from the left ear.',
        cameraDirection: 'Slow circular track following the laser beam line across weeping stone walls.',
        visualPrompt: 'Haunting cinematic still of an abandoned Gothic stone rotunda with snow drifting from a collapsed dome, green laser grid mapping obsidian confessional chamber, 35mm horror film.'
      },
      {
        sceneNumber: 2,
        slugline: 'INT. SANATORIUM BASEMENT ARCHIVE - MIDNIGHT',
        title: 'The Severed Tapes',
        intensity: 8,
        actionDescription: 'Elena unspools brittle 1948 reel-to-reel magnetic audio tape using a battery-powered tape recorder.',
        dialogueSnippet: 'DR. KAUFMAN (on tape):\nWe gave it words, and words gave it hunger. It has outgrown the booth.',
        soundDesignCue: 'Hiss of vintage magnetic tape, warped voices overlapping, followed by a sudden mechanical snap of the tape breaking.',
        cameraDirection: 'Tight framing on Elena\'s trembling fingers holding the spliced magnetic tape as shadows lengthen behind her.',
        visualPrompt: 'Cinematic psychological horror scene, young woman in winter coat in dark stone archive lit by single lantern, vintage reel to reel player, creepy shadows, atmospheric dread.'
      }
    ],
    prologueNarration: 'Some stones are cut to hold roofs. Some stones are cut to hold graves. But the stones of Saint Jude were cut to hold what we dare not say aloud.',
    epilogueNarration: 'The snow will bury the spire by spring. But if you stand on the ridge when the wind dies down... listen. The stone still remembers.',
    directorNotes: {
      colorPalette: 'Muted bone white (#f8fafc), slate blue (#334155), obsidian charcoal (#020617).',
      cinematographyStyle: 'Symmetrical Kubrickian one-point perspectives that make the architecture feel menacingly watchful.',
      soundPhilosophy: 'Spatial ASMR horror: intimate whispering recorded binaurally mixed with colossal echoing cavernous reverb.',
      comparativeFilms: 'The Shining meets The Night House and Session 9.'
    },
    createdAt: '2026-10-06T15:30:00.000Z'
  },
  {
    id: 'sample_submerged_parish',
    title: 'THE SUBMERGED PARISH',
    tagline: 'The bells still toll beneath fifty fathoms of dark water.',
    logline: 'A commercial saturation diving team repairing a reservoir dam discovers an intact 18th-century stone cathedral submerged in the silt, where an ancient liturgical curse awakens every night at midnight.',
    synopsis: 'In 1932, the town of Blackwater was intentionally flooded to construct a hydroelectric reservoir, burying St. Jude\'s Parish beneath 300 feet of freezing dark water. Decades later, deep-sea saturation diver Jonah Vance and his crew are dispatched into the flooded abyss to seal high-pressure hairline fractures in the dam bedrock.\n\nWhile conducting acoustic sonar scans of the flooded valley floor, Jonah discovers the cathedral steeple is structurally pristine. Even worse: their hydrophones begin recording rhythmic, reverberating brass chimes identical to the sunken church bells. Local legends whispered that the parish was flooded intentionally by the state after the congregation engaged in occult baptism rituals with a subterranean aquatic entity known as "The Silt Matron."\n\nWhen a sudden tectonic valve collapse traps the four divers inside their underwater pressurized habitat with limited mixed-gas reserves, the water level begins rising from beneath the floorboards—and the voices of the drowned congregation begin speaking through their diving helmet radios.',
    genre: 'Supernatural Horror',
    tone: 'Terrifying',
    location: 'Flooded Blackwater Reservoir & Sunken 18th-Century Cathedral',
    runtime: '100 minutes',
    rulesOfHorror: [
      'Never breathe unmixed habitat air when the underwater bells begin ringing.',
      'Reflections in diving helmet glass show the drowned standing directly behind you in the silt.',
      'Once a diver touches the consecrated altar stone underwater, their blood begins turning into silt.',
      'The Silt Matron can only claim you if you answer her when she mimics your mother\'s voice over the radio.'
    ],
    mainThreat: {
      name: 'The Silt Matron & The Drowned Congregation',
      classification: 'Subaquatic Supernatural Entity / Parish Curse',
      description: 'An ancient leviathan-class aquatic presence wrapped in rotting ecclesiastical vestments and river silt, possessing sunken human corpses as acoustic puppets.',
      huntingMethod: 'Projects low-frequency subaquatic liturgical chants that rupture eardrums and induce hypnotic voluntary decompression dive sickness.',
      fatalVulnerabilityOrMystery: 'High-voltage galvanic electrical discharge disrupts her aqueous spiritual cohesion, temporarily banishing the manifestation into suspended silt particles.'
    },
    setting: {
      name: 'Blackwater Hydroelectric Reservoir Depth',
      atmosphericDescription: 'Murky near-zero-visibility black water where industrial dive lamps only illuminate 6 feet of suspended particles. Massive decaying Gothic archways loom out of the underwater darkness like ribcages.',
      dreadFactors: [
        'Rapid decompression sickness (the bends) if divers attempt emergency ascent.',
        'Total darkness where sound travels 4.3 times faster than in air, making whispers disorienting.',
        'Oxygen gas toxicity and nitrogen narcosis creating waking hallucinations.'
      ],
      sensoryDetails: 'The metallic taste of dry heliox breathing gas; the chilling vibrations of iron cathedral bells vibrating through the divers\' teeth.'
    },
    characters: [
      {
        id: 'c1',
        name: 'Jonah Vance',
        role: 'Protagonist / Lead Saturation Diver',
        archetype: 'The Haunted Deep-Sea Veteran',
        background: 'Veteran commercial diver with 15 years on deepwater infrastructure projects, plagued by nightmares of a past lost crew member.',
        fatalFlaw: 'Refuses to abort missions due to stubborn pride; suppresses acoustic hallucinations.',
        relationshipDynamics: 'Protective of his younger tender, but clashes violently with the corporate supervisor.',
        survivalOdds: '45% - High Physical Resilience',
        actorInspiration: 'Karl Urban'
      },
      {
        id: 'c2',
        name: 'Claire Moreau',
        role: 'Sonar Acoustician & Hydrologist',
        archetype: 'The Scientific Skeptic',
        background: 'Academic researcher studying anomalous underwater soundwaves in the reservoir.',
        fatalFlaw: 'Prioritizes capturing acoustic telemetry data over immediate evacuation safety.',
        relationshipDynamics: 'Provides critical deciphering of the church bell frequencies.',
        survivalOdds: '55% - High Situational Awareness',
        actorInspiration: 'Rebecca Ferguson'
      }
    ],
    act1: {
      title: 'The Abyss Below the Dam',
      setup: 'Jonah and his crew descend in a diving bell 280 feet into the murky flooded reservoir, inspecting seismic stress fractures on the dam masonry.',
      incitingIncident: 'The sonar pulse reflects off an impossible Gothic cathedral spire protruding from the sediment, followed by a resonant metallic clang through the water.',
      plotPoint1: 'A mechanical winch failure severs the primary umbilical cable to the surface support barge, leaving the habitat on emergency battery reserves.',
      turningPoint: 'Jonah enters the cathedral nave through a collapsed stained-glass rosette to retrieve a backup telemetry beacon.'
    },
    act2: {
      title: 'The Sunken Liturgy',
      risingTension: 'The divers detect human movement on sonar circling the submerged bell tower. Divers outside report seeing figures kneeling in prayer on silt pews.',
      midpointRevelation: 'Claire discovers historical flood records: the parish priest deliberately drowned 80 parishioners in 1932 to complete a baptism pact with the river entity.',
      climaxOfDespair: 'A crew member is drawn out of the airlock into the black water by a voice mimicking his daughter, his helmet depressurizing in seconds.',
      allIsLostMoment: 'Water breaches the lower deck of the decompression habitat, flooding their scrubbers with contaminated reservoir silt.'
    },
    act3: {
      title: 'The Final Baptism',
      climaxConfrontation: 'Jonah arms a commercial galvanic blasting charge inside the flooded bell tower, swimming through an army of drowned parishioners to place the detonator.',
      costOfSurvival: 'Jonah is forced to undergo emergency rapid ascent, enduring excruciating explosive decompression to reach the surface dock.',
      ending: 'The underwater cathedral detonates in a massive shockwave of light and foam, breaking the century-old curse as the dam holds.',
      finalShot: 'Jonah lies on the recovery barge breathing pure oxygen. In a water glass beside his cot, the surface water ripples in the exact rhythm of a distant church bell.'
    },
    ending: 'The reservoir is quiet once more, but the water Jonah brought up in his lungs will never truly leave him.',
    keyQuotes: [
      {
        character: 'Jonah Vance',
        quote: 'Down here, you don\'t swim away from a sound. Sound is everywhere at once.',
        context: 'Warning Claire as the hydrophone picks up midnight chimes.'
      }
    ],
    scenes: [
      {
        sceneNumber: 1,
        slugline: 'EXT. FLOODED CATHEDRAL ROSETTE - 280 FEET DEEP',
        title: 'The Sunken Cross',
        intensity: 7,
        actionDescription: 'Jonah\'s high-output dive torch cuts through brown river sediment. Out of the darkness looms an enormous wrought-iron cross coated in eighty years of freshwater mussels.',
        dialogueSnippet: 'JONAH (into radio, raspy heliox voice):\nTopside, I\'m looking at the parish roof. The masonry hasn\'t weathered. It looks like it was sunk yesterday.',
        soundDesignCue: 'Heavy rhythmic hiss of the diving regulator, punctuated by a distant underwater metallic toll that vibrates through the diver\'s skull.',
        cameraDirection: 'Wide underwater tracking shot rising from the silt floor to reveal the colossal sunken Gothic cathedral.',
        visualPrompt: 'Cinematic deep sea underwater horror still, commercial saturation diver with glowing helmet lamp illuminating ancient submerged stone cathedral covered in river silt, dark ominous green water, photorealistic 8k.'
      }
    ],
    prologueNarration: 'They built the dam to drown the town. But water does not kill prayer. It only preserves it in the cold.',
    epilogueNarration: 'The dam still stands. But if you stand on the reservoir shore at midnight, lean over the rail... and listen. The water is still praying.',
    directorNotes: {
      colorPalette: 'Murky aquatic emerald (#064e3b), silt charcoal (#0a0a0c), industrial safety amber (#d97706).',
      cinematographyStyle: 'Claustrophobic underwater macro shots with heavy particulate backscatter and volumetric light cones.',
      soundPhilosophy: 'Subaquatic acoustic design: low frequencies travel faster, creating disorienting spatial audio where sounds are omnipresent.',
      comparativeFilms: 'The Abyss meets The Conjuring and Underwater.'
    },
    createdAt: '2026-10-06T18:00:00.000Z'
  }
];
