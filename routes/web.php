<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

Route::get('/', function () {
    return Inertia::render('LoginPage', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/notes', [NoteController::class, 'index'])
        ->name('notes.index');

    Route::get('/notes/create', [NoteController::class, 'create'])
        ->name('notes.create');

    Route::post('/notes/store', [NoteController::class, 'store'])
        ->name('notes.store');

    Route::get('/notes/{note}', [NoteController::class, 'show'])
        ->name('notes.show');

    Route::get('/notes/{note}/edit', [NoteController::class, 'edit'])
        ->name('note.edit');

    Route::put('/notes/{note}', [NoteController::class, 'update'])
        ->name('note.update');

    Route::delete('/notes/{note}', [NoteController::class, 'destroy'])
        ->name('note.destroy');
});

require __DIR__.'/settings.php';
