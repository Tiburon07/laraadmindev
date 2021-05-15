@extends('base.base')

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Nuovo album</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                            <li class="breadcrumb-item"><a href="{{route('album-list')}}">Galleria</a></li>
                            <li class="breadcrumb-item active">Nuovo album</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <form method="POST" action="{{route('album-store')}}">
                    @method('POST')
                    @csrf()
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input class="form-control" required name="album_name" value="" id="album_name">
                    </div>
                    <div class="form-group">
                        <label for="name">Descrizione</label>
                        <textarea required class="form-control" name="album_descr" id="album_descr"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="album_thumb">File input</label>
                        <input required class="form-control" type="file" name="album_thumb" id="album_thumb">
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

