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
            <form method="POST" action="{{route('album-update')}}" enctype="multipart/form-data">
                @method('POST')
                @csrf()
{{--                {{method_field('PATCH')}}--}}
{{--                <input type="hidden" name="_method" value="PATCH">--}}
                <input class="form-control" type="hidden" name="album" value="{{$album->id}}" id="album">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input class="form-control" name="album_name" value="{{$album->album_name}}" id="album_name">
                </div>
                @if($album->album_thumb)
                    <div class="form-group">
                        <img width="300" src="{{url('/storage/'.$album->album_thumb)}}" alt="{{$album->album_name}}" title="{{$album->album_name}}">
                    </div>
                @endif
                <div class="form-group">
                    <label for="name">Descrizione</label>
                    <textarea class="form-control" name="album_descr" id="album_descr">{{$album->description}}</textarea>
                </div>
                <div class="form-group">
                    <label for="album_thumb">File input</label>
                    <input class="form-control" type="file" name="album_thumb" id="album_thumb">
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

