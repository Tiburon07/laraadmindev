<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Federazione
 *
 * @property int $id
 * @property string|null $sigla
 * @property string|null $esteso
 * @property int|null $tipo_fed
 * @method static \Database\Factories\FederazioneFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione query()
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione whereEsteso($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione whereSigla($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Federazione whereTipoFed($value)
 * @mixin \Eloquent
 */
class Federazione extends Model
{
    use HasFactory;
    protected $table = '01_federazione';
}
