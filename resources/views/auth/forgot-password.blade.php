<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <a href="/">
                <img class="animation__wobble" src="{{asset('dist/img/AdminLTELogo.png')}}" alt="AdminDevLogo" height="60" width="60">
            </a>
        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
            {{ __('
Hai dimenticato la password? Nessun problema. Comunicaci il tuo indirizzo e-mail e ti invieremo un link per reimpostre la password tramite e-mail che ti consentirà di sceglierne una nuova.') }}
        </div>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            <!-- Email Address -->
            <div>
                <x-label for="email" :value="__('Email')" />

                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            </div>

            <div class="flex items-center justify-end mt-4 ">
                <a class="underline text-sm text-gray-600 hover:text-gray-900 mr-3" href="{{ route('login') }}">
                    {{ __('Vai al login!') }}
                </a>
                <x-button>
                    {{ __('Email Password Reset Link') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout>
