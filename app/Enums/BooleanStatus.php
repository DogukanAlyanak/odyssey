<?php

namespace App\Enums;

use Illuminate\Support\Facades\Lang;

enum BooleanStatus: int
{
    case TRUE = 1;
    case FALSE = 0;

    /**
     * Enum değerini metne dönüştürür
     */
    public function toString(): string
    {
        return $this->label();
    }

    /**
     * Enum değerini boolean'a dönüştürür
     */
    public function toBoolean(): bool
    {
        return match($this) {
            self::TRUE => true,
            self::FALSE => false,
        };
    }

    /**
     * Boolean değerinden enum oluşturur
     */
    public static function fromBoolean(bool $value): self
    {
        return $value ? self::TRUE : self::FALSE;
    }

    /**
     * Çeviriye uygun olarak etiket döndürür
     */
    public function label(): string
    {
        $key = strtolower($this->name);
        return Lang::get("enums.boolean_status.{$key}");
    }

    /**
     * İnsan tarafından okunabilir metinleri içeren dizi döndürür
     */
    public static function labels(): array
    {
        return [
            self::TRUE->value => self::TRUE->label(),
            self::FALSE->value => self::FALSE->label(),
        ];
    }
}
