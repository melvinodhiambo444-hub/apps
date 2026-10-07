import { jsPDF } from 'jspdf';
import { Movie } from '../types/movie';

export type ExportPdfMode = 'full' | 'screenplay' | 'dossier';

export function generateMoviePdf(movie: Movie, mode: ExportPdfMode = 'full'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 54; // 0.75 in
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Helper for adding new page with page number & header
  const addPageIfNeeded = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin - 20) {
      doc.addPage();
      y = margin;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(`WHISPER STUDIO  |  ${movie.title.toUpperCase()}  |  CONFIDENTIAL PRODUCTION DOSSIER`, margin, margin - 20);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, margin - 14, pageWidth - margin, margin - 14);
  };

  // ==========================================
  // 1. TITLE PAGE (Standard Hollywood style)
  // ==========================================
  // Title Page Background styling
  doc.setFillColor(15, 15, 20);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative crimson accent bar
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, 90, contentWidth, 3, 'F');

  // Studio watermark
  doc.setFont('courier', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(220, 38, 38);
  doc.text('WHISPER  //  AI HORROR PRODUCTION DOSSIER', margin, 115);

  // Movie Title
  doc.setFont('times', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(movie.title.toUpperCase(), contentWidth);
  doc.text(titleLines, margin, 170);

  const titleHeight = titleLines.length * 36;
  let titleY = 170 + titleHeight;

  // Tagline
  doc.setFont('times', 'italic');
  doc.setFontSize(15);
  doc.setTextColor(239, 68, 68);
  doc.text(`"${movie.tagline}"`, margin, titleY + 10);

  // Metadata block
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 190);
  doc.text(`GENRE: ${movie.genre.toUpperCase()}   |   TONE: ${movie.tone.toUpperCase()}   |   RUNTIME: ${movie.runtime}`, margin, titleY + 45);
  doc.text(`PRIMARY LOCATION: ${movie.location}`, margin, titleY + 62);

  // Divider
  doc.setDrawColor(60, 60, 75);
  doc.setLineWidth(0.75);
  doc.line(margin, titleY + 80, pageWidth - margin, titleY + 80);

  // Logline Box
  doc.setFillColor(25, 25, 35);
  doc.roundedRect(margin, titleY + 95, contentWidth, 80, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(220, 38, 38);
  doc.text('PREMISE LOGLINE:', margin + 15, titleY + 115);

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(235, 235, 240);
  const loglineLines = doc.splitTextToSize(`"${movie.logline}"`, contentWidth - 30);
  doc.text(loglineLines, margin + 15, titleY + 132);

  // Threat & Rules Teaser
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 190);
  doc.text('CORE THREAT CLASSIFICATION:', margin, titleY + 205);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`${movie.mainThreat?.name}  (${movie.mainThreat?.classification})`, margin, titleY + 220);

  // Bottom Title Page Info
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 130);
  const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`ARCHIVED AT: ${todayStr}`, margin, pageHeight - 75);
  doc.text('ORIGINAL SCREENPLAY & CONCEPT REGISTERED VIA WHISPER STUDIO', margin, pageHeight - 60);

  // ==========================================
  // PAGE 2: EXECUTIVE DOSSIER & HORROR MYTHOS
  // ==========================================
  if (mode === 'full' || mode === 'dossier') {
    doc.addPage();
    drawPageHeader();
    y = margin + 10;

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 20, 25);
    doc.text('SECTION 01: NARRATIVE SYNOPSIS & MYTHOS LAWS', margin, y);
    y += 24;

    // Synopsis
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(185, 28, 28);
    doc.text('FULL STORY SYNOPSIS', margin, y);
    y += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const synLines = doc.splitTextToSize(movie.synopsis, contentWidth);
    doc.text(synLines, margin, y);
    y += synLines.length * 13 + 20;

    // Rules of Horror
    addPageIfNeeded(160);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text('THE IMMUTABLE RULES OF HORROR', margin, y);
    y += 16;

    movie.rulesOfHorror?.forEach((rule, idx) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(185, 28, 28);
      doc.text(`LAW 0${idx + 1}:`, margin, y);

      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      const ruleLines = doc.splitTextToSize(rule, contentWidth - 60);
      doc.text(ruleLines, margin + 55, y);
      y += ruleLines.length * 13 + 6;
    });

    y += 14;

    // Threat Dossier
    addPageIfNeeded(150);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text('MAIN THREAT PHYSIOLOGY & BEHAVIOR', margin, y);
    y += 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 25);
    doc.text(`${movie.mainThreat?.name}  [${movie.mainThreat?.classification}]`, margin, y);
    y += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    const threatDesc = doc.splitTextToSize(`Description: ${movie.mainThreat?.description}`, contentWidth);
    doc.text(threatDesc, margin, y);
    y += threatDesc.length * 12 + 6;

    const huntDesc = doc.splitTextToSize(`Hunting Method: ${movie.mainThreat?.huntingMethod}`, contentWidth);
    doc.text(huntDesc, margin, y);
    y += huntDesc.length * 12 + 6;

    const vulnDesc = doc.splitTextToSize(`Vulnerability / Mystery: ${movie.mainThreat?.fatalVulnerabilityOrMystery}`, contentWidth);
    doc.text(vulnDesc, margin, y);
    y += vulnDesc.length * 12 + 20;

    // Setting & Atmospheric details
    addPageIfNeeded(120);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text('ATMOSPHERIC SETTING & DREAD PROFILE', margin, y);
    y += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const setDesc = doc.splitTextToSize(`${movie.setting?.name || movie.location}: ${movie.setting?.atmosphericDescription}`, contentWidth);
    doc.text(setDesc, margin, y);
    y += setDesc.length * 12 + 8;

    if (movie.setting?.sensoryDetails) {
      doc.setFont('times', 'italic');
      const sensoryLines = doc.splitTextToSize(`Sensory Elements: "${movie.setting.sensoryDetails}"`, contentWidth);
      doc.text(sensoryLines, margin, y);
      y += sensoryLines.length * 12 + 15;
    }
  }

  // ==========================================
  // PAGE 3: ENSEMBLE CHARACTERS & PSYCHOLOGY
  // ==========================================
  if (mode === 'full' || mode === 'dossier') {
    doc.addPage();
    drawPageHeader();
    y = margin + 10;

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 20, 25);
    doc.text('SECTION 02: DRAMATIS PERSONAE & SURVIVAL ODDS', margin, y);
    y += 24;

    movie.characters?.forEach((char, idx) => {
      addPageIfNeeded(120);

      // Character Card Container Box
      doc.setDrawColor(210, 210, 215);
      doc.setLineWidth(0.5);
      doc.setFillColor(250, 250, 252);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(185, 28, 28);
      doc.text(`${char.name.toUpperCase()}  —  ${char.role.toUpperCase()}`, margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Archetype: ${char.archetype}   |   Survival Odds: ${char.survivalOdds}`, margin, y + 13);

      if (char.actorInspiration) {
        doc.text(`Casting Model: ${char.actorInspiration}`, margin, y + 25);
      }
      y += char.actorInspiration ? 38 : 26;

      doc.setFont('times', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(40, 40, 40);
      const bgLines = doc.splitTextToSize(`Background: ${char.background}`, contentWidth);
      doc.text(bgLines, margin, y);
      y += bgLines.length * 12 + 4;

      doc.setFont('times', 'bold');
      doc.setTextColor(180, 30, 30);
      const flawLines = doc.splitTextToSize(`Fatal Flaw: ${char.fatalFlaw}`, contentWidth);
      doc.text(flawLines, margin, y);
      y += flawLines.length * 12 + 4;

      doc.setFont('times', 'italic');
      doc.setTextColor(70, 70, 70);
      const relLines = doc.splitTextToSize(`Dynamics: ${char.relationshipDynamics}`, contentWidth);
      doc.text(relLines, margin, y);
      y += relLines.length * 12 + 16;
    });

    // Signature Quotes
    if (movie.keyQuotes && movie.keyQuotes.length > 0) {
      addPageIfNeeded(100);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(185, 28, 28);
      doc.text('KEY SIGNATURE DIALOGUE', margin, y);
      y += 16;

      movie.keyQuotes.forEach((q) => {
        doc.setFont('times', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(20, 20, 20);
        const qLines = doc.splitTextToSize(`"${q.quote}"`, contentWidth - 40);
        doc.text(qLines, margin + 20, y);
        y += qLines.length * 13 + 3;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(120, 120, 120);
        doc.text(`— ${q.character} (${q.context})`, margin + 20, y);
        y += 14;
      });
    }
  }

  // ==========================================
  // PAGE 4: THREE-ACT NARRATIVE ARCHITECTURE
  // ==========================================
  if (mode === 'full' || mode === 'dossier') {
    doc.addPage();
    drawPageHeader();
    y = margin + 10;

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 20, 25);
    doc.text('SECTION 03: THREE-ACT NARRATIVE STRUCTURE', margin, y);
    y += 24;

    // Act 1
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text(`ACT I: ${movie.act1?.title.toUpperCase() || 'THE SETUP'}`, margin, y);
    y += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const act1Lines = doc.splitTextToSize(
      `Setup: ${movie.act1?.setup}\nInciting Incident: ${movie.act1?.incitingIncident}\nPlot Point 1: ${movie.act1?.plotPoint1}\nTurning Point: ${movie.act1?.turningPoint}`,
      contentWidth
    );
    doc.text(act1Lines, margin, y);
    y += act1Lines.length * 12 + 18;

    // Act 2
    addPageIfNeeded(140);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text(`ACT II: ${movie.act2?.title.toUpperCase() || 'THE RISING TERROR'}`, margin, y);
    y += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const act2Lines = doc.splitTextToSize(
      `Rising Tension: ${movie.act2?.risingTension}\nMidpoint Revelation: ${movie.act2?.midpointRevelation}\nClimax of Despair: ${movie.act2?.climaxOfDespair}\nAll Is Lost: ${movie.act2?.allIsLostMoment}`,
      contentWidth
    );
    doc.text(act2Lines, margin, y);
    y += act2Lines.length * 12 + 18;

    // Act 3 & Ending
    addPageIfNeeded(140);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text(`ACT III: ${movie.act3?.title.toUpperCase() || 'THE CLIMAX & FINAL SACRAMENT'}`, margin, y);
    y += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const act3Lines = doc.splitTextToSize(
      `Climax Confrontation: ${movie.act3?.climaxConfrontation}\nCost of Survival: ${movie.act3?.costOfSurvival}\nResolution: ${movie.ending}\nFinal Lingering Shot: "${movie.act3?.finalShot}"`,
      contentWidth
    );
    doc.text(act3Lines, margin, y);
    y += act3Lines.length * 12 + 20;

    // Director Notes
    if (movie.directorNotes) {
      addPageIfNeeded(100);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('DIRECTOR CINEMATOGRAPHY & SOUND DIRECTION', margin, y);
      y += 14;

      doc.setFont('times', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text(`Color Palette: ${movie.directorNotes.colorPalette}`, margin, y);
      y += 12;
      doc.text(`Cinematography: ${movie.directorNotes.cinematographyStyle}`, margin, y);
      y += 12;
      doc.text(`Sound Design Philosophy: ${movie.directorNotes.soundPhilosophy}`, margin, y);
      y += 12;
      doc.text(`Touchstones: ${movie.directorNotes.comparativeFilms}`, margin, y);
      y += 20;
    }
  }

  // ==========================================
  // PAGE 5+: THE HOLLYWOOD SCREENPLAY SCRIPT
  // ==========================================
  if (mode === 'full' || mode === 'screenplay') {
    doc.addPage();
    drawPageHeader();
    y = margin + 10;

    doc.setFont('courier', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 15, 20);
    doc.text('THE HOLLYWOOD SCREENPLAY', margin, y);
    y += 24;

    // Prologue Narration
    if (movie.prologueNarration) {
      doc.setFont('courier', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(185, 28, 28);
      doc.text('BLACK SCREEN.', margin, y);
      y += 16;

      doc.setFont('courier', 'bold');
      doc.setTextColor(20, 20, 20);
      doc.text('VOICEOVER (WHISPERING)', pageWidth / 2 - 80, y);
      y += 14;

      doc.setFont('courier', 'normal');
      doc.setFontSize(10);
      const proLines = doc.splitTextToSize(`"${movie.prologueNarration}"`, 360);
      doc.text(proLines, pageWidth / 2 - 140, y);
      y += proLines.length * 13 + 24;
    }

    // Scenes
    movie.scenes?.forEach((sc) => {
      addPageIfNeeded(160);

      // Slugline
      doc.setFont('courier', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 15, 20);
      doc.text(`SCENE ${sc.sceneNumber}: ${sc.slugline.toUpperCase()}`, margin, y);
      y += 16;

      // Tension and Sound Cue Tag
      doc.setFont('courier', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(160, 20, 20);
      doc.text(`[TENSION LEVEL: ${sc.intensity}/10  |  SOUND DESIGN: ${sc.soundDesignCue}]`, margin, y);
      y += 14;

      if (sc.generatedScript) {
        // Complete generated screenplay text in classic Courier layout
        doc.setFont('courier', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(20, 20, 20);

        const scriptLines = sc.generatedScript.split('\n');
        scriptLines.forEach((line) => {
          addPageIfNeeded(14);
          const trimmed = line.trim();

          // Check if it's a character cue (short, uppercase)
          const isCharacterName = trimmed.length > 0 && trimmed === trimmed.toUpperCase() && trimmed.length < 25 && !trimmed.startsWith('INT.') && !trimmed.startsWith('EXT.');

          if (isCharacterName) {
            doc.setFont('courier', 'bold');
            doc.text(trimmed, pageWidth / 2 - 50, y);
            doc.setFont('courier', 'normal');
          } else if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
            // Parenthetical
            doc.setFont('courier', 'italic');
            doc.text(trimmed, pageWidth / 2 - 40, y);
            doc.setFont('courier', 'normal');
          } else if (line.startsWith('    ') || line.startsWith('\t')) {
            // Indented dialogue
            const wrapped = doc.splitTextToSize(trimmed, 340);
            doc.text(wrapped, pageWidth / 2 - 120, y);
            y += (wrapped.length - 1) * 12;
          } else {
            // Action block
            const wrapped = doc.splitTextToSize(line, contentWidth);
            doc.text(wrapped, margin, y);
            y += (wrapped.length - 1) * 12;
          }
          y += 13;
        });
        y += 15;
      } else {
        // Action description
        doc.setFont('courier', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 30);
        const actionLines = doc.splitTextToSize(sc.actionDescription, contentWidth);
        doc.text(actionLines, margin, y);
        y += actionLines.length * 13 + 12;

        // Dialogue Snippet
        if (sc.dialogueSnippet) {
          const diaLines = sc.dialogueSnippet.split('\n');
          diaLines.forEach((dLine) => {
            addPageIfNeeded(14);
            const diaTrim = dLine.trim();
            if (diaTrim.endsWith(':')) {
              doc.setFont('courier', 'bold');
              doc.text(diaTrim.replace(':', ''), pageWidth / 2 - 60, y);
              doc.setFont('courier', 'normal');
            } else {
              const diaWrapped = doc.splitTextToSize(diaTrim, 320);
              doc.text(diaWrapped, pageWidth / 2 - 110, y);
              y += (diaWrapped.length - 1) * 12;
            }
            y += 13;
          });
          y += 10;
        }

        // Camera direction
        if (sc.cameraDirection) {
          addPageIfNeeded(20);
          doc.setFont('courier', 'italic');
          doc.setFontSize(9);
          doc.setTextColor(90, 90, 90);
          const camWrapped = doc.splitTextToSize(`CAMERA: ${sc.cameraDirection}`, contentWidth);
          doc.text(camWrapped, margin, y);
          y += camWrapped.length * 12 + 10;
        }

        // Visual concept prompt
        if (sc.visualPrompt) {
          addPageIfNeeded(25);
          doc.setFont('courier', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(110, 110, 120);
          const promptWrapped = doc.splitTextToSize(`VISUAL PROMPT: ${sc.visualPrompt}`, contentWidth);
          doc.text(promptWrapped, margin, y);
          y += promptWrapped.length * 11 + 16;
        }
      }

      // Divider between scenes
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 18;
    });

    // Epilogue Narration
    if (movie.epilogueNarration) {
      addPageIfNeeded(120);
      doc.setFont('courier', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(185, 28, 28);
      doc.text('FINAL SHOT CUTS TO DEAD STATIC.', margin, y);
      y += 16;

      doc.setFont('courier', 'bold');
      doc.setTextColor(20, 20, 20);
      doc.text('VOICEOVER (EPILOGUE)', pageWidth / 2 - 70, y);
      y += 14;

      doc.setFont('courier', 'normal');
      doc.setFontSize(10);
      const epiLines = doc.splitTextToSize(`"${movie.epilogueNarration}"`, 360);
      doc.text(epiLines, pageWidth / 2 - 140, y);
      y += epiLines.length * 13 + 30;

      doc.setFont('courier', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 15, 20);
      doc.text('FADE OUT.', margin, y);
      y += 18;
      doc.text('THE END.', margin, y);
    }
  }

  // Add Page Numbers to all pages (except title page)
  const totalPages = doc.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`PAGE ${i} OF ${totalPages}`, pageWidth - margin - 60, pageHeight - 30);
    doc.text('WHISPER STUDIOS // PROPRIETARY HORROR DOSSIER', margin, pageHeight - 30);
  }

  // Save the PDF file to user device
  const sanitizedTitle = movie.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${sanitizedTitle}_WHISPER_SCRIPT.pdf`);
}
