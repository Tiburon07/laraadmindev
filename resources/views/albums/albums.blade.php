@extends('base.base')

@section('document_ready')

@stop

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Galleria</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                            <li class="breadcrumb-item active">Galleria</li>
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
                    <div>
                        <div class="alert alert-default-info alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>
                            <h6><i class="icon fa fa-info"></i>{{session()->get('message')}}.</h6>
                        </div>
                    </div>
                @endif
                <div class="row">
                    <div class="col-12">
                        <a href="{{route('album-create')}}" class="btn btn-block btn-primary">Nuovo album</a>
                    </div>
                </div>
                <form>
                    <input type='hidden' id="_token" name="_token" value="{{csrf_token()}}">
                    <ul id="album_ul" class="list-group">
                        @foreach($albums as $album)
                            <li class="list-group-item d-flex justify-content-between">
                                <p>{{$album->album_name}} - {{$album->id}}</p>
                                @if($album->album_thumb)
                                    <div class="form-group">
                                        <p></p>
                                        <img width="300" src="{{url('/storage/'.$album->album_thumb)}}" alt="{{$album->album_name}}" title="{{$album->album_name}}">
                                    </div>
                                @endif
                                <div>
                                    <a href="{{route('album-edit',['album'=>$album->id])}}" class="btn btn-primary">Update</a>
                                    <a href="{{route('album-delete',['album'=>$album->id])}}" class="btn btn-danger">Delete</a>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </form>
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
@endsection

@section('extra_js')
    <!-- Album -->
    <script src="{{url('/js/album/Album.js')}}"></script>
@stop
