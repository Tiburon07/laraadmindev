
@extends('base.base')

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Immagini album</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                            <li class="breadcrumb-item"><a href="{{route('album-list')}}">Galleria</a></li>
                            <li class="breadcrumb-item active">Immagini album</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <table class="table table-striped table-hover">
                    <tr>
                        <th>ID</th>
                        <th>Created date</th>
                        <th>title</th>
                        <th>album</th>
                        <th>Thumbnail</th>
                    </tr>
                    @forelse($album['images'] as $image)
                        <tr>
                            <td>{{$image->id}}</td>
                            <td>{{$image->created_at}}</td>
                            <td>{{$image->name}}</td>
                            <td>{{$album['album_name']}}</td>
                            <td>
                                <img width="200" alt="{{$image->name}}" title="{{$image->name}}" src="{{url($image->img_path)}}">
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">
                               No images found
                            </td>
                        </tr>
                    @endforelse
                </table>
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
@endsection

