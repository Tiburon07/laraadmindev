@extends('base.base')

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Modifica Album {{$album->id}}</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{route('album-list')}}">Galleria</a></li>
                        <li class="breadcrumb-item active">Modifica Album</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            @if(session()->has('message'))
                <div class="alert- alert-info">{{session()->get('message')}}</div>
            @endif
            <form method="POST" action="{{route('album-update', ['album'=>$album->id])}}">
                @method('PATCH')
                @csrf()
{{--                {{method_field('PATCH')}}--}}
{{--                <input type="hidden" name="_method" value="PATCH">--}}
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input class="form-control" name="album_name" value="{{$album->album_name}}" id="album_name">
                </div>
                <div class="form-group">
                    <label for="name">Descrizione</label>
                    <textarea class="form-control" name="album_descr" id="album_descr">{{$album->description}}</textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Salva</button>
                </div>
            </form>
        </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
</div>
@endsection

