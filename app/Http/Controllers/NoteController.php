<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        return Inertia::render('notes/Index', [
            'notes' => Note::where('user_id', auth()->id())
            ->latest()
            ->get()
        ]);
    }

    public function create()
    {
        return inertia('notes/Create');
    }

    public function show(Note $note)
    {
        return Inertia::render('notes/Show', [
            'note' => $note,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Note::create($validated);

        return redirect()
            ->route('notes.index')
            ->with('success', 'Note created successfully');
    }

    public function edit(Note $note)
    {
        return Inertia::render('notes/Edit', [
            'note' => $note
        ]);
    }

    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note->update($validated);

        return redirect()
            ->route('notes.show', $note)
            ->with('success', 'Note updated successfully.');
    }

    public function destroy(Note $note) {
        $note->delete();

        return redirect()
        ->route('notes.index')
        ->with('success', 'Note deleted successfully.');
    }
}
