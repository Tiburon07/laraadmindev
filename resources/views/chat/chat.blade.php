@extends('base.base')

@section('document_ready')
    let authUser = {
        id : '{{Auth::user()->id}}',
        user_name : '{{Auth::user()->name}}',
    }
    new admindev.Chat(authUser);
@stop

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Chat</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}}">Home</a></li>
                        <li class="breadcrumb-item active">Chat</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card direct-chat direct-chat-primary">
                        <div class="card-header">
                            <h3 class="card-title">Chat</h3>
                            <div class="card-tools">
{{--                                <span title="3 New Messages" class="badge badge-primary">1</span>--}}
                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                <button type="button" class="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle"><i class="fas fa-comments"></i></button>
{{--                                <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>--}}
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="chat_content" class="direct-chat-messages" style="height: 30rem;">
                                @foreach($messages as $message)
                                    @if(Auth::id() == $message->user_id)
                                        <div class="direct-chat-msg">
                                            <div class="direct-chat-info clearfix">
                                                <span class="direct-chat-name pull-left">{{$message->user_name}}</span>
                                                <span class="direct-chat-timestamp pull-right">{{$message->created_at}}</span>
                                            </div>
                                            <img class="direct-chat-img" src="dist/img/avatar4.png" alt="message user image">
                                            <div class="direct-chat-text">
                                                {{$message->message}}
                                            </div>
                                        </div>
                                    @else
                                        <div class="direct-chat-msg right">
                                            <div class="direct-chat-info clearfix">
                                                <span class="direct-chat-name pull-right">{{$message->user_name}}</span>
                                                <span class="direct-chat-timestamp pull-left">{{$message->created_at}}</span>
                                            </div>
                                            <img class="direct-chat-img" src="dist/img/avatar5.png" alt="message user image">
                                            <div class="direct-chat-text">
                                                {{$message->message}}
                                            </div>
                                        </div>
                                    @endif
                                @endforeach
                            </div>
                            <div class="direct-chat-contacts" style="height: 30rem;">
                                <ul class="contacts-list">
                                    <li>
                                        <a href="#">
                                            <img class="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar">
                                            <div class="contacts-list-info">
                                                <span class="contacts-list-name">Count Dracula<small class="contacts-list-date float-right">2/28/2015</small></span>
                                                <span class="contacts-list-msg">How have you been? I was...</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-footer">
                            <form id="message-form">
                                <div class="input-group">
                                    <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}" />
                                    <input type="hidden" id="chat_username" name="user_name" value="{{ Auth::user()->name }}" class="form-control">
                                    <input type="hidden" id="chat_userid" name="user_id" value="{{ Auth::user()->id }}" class="form-control">
                                    <input type="text" id="chat_input_msg" name="message" placeholder="messaggio ..." class="form-control">
                                    <span class="input-group-append">
                                        <button id="chat_btn_send" type="submit" class="btn btn-primary">Send</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
{{--                <div class="col-md-4">--}}
{{--                    <!-- USERS LIST -->--}}
{{--                    <div class="box box-danger">--}}
{{--                        <!-- /.box-header -->--}}
{{--                        <div class="box-body no-padding">--}}
{{--                            <ul class="users-list clearfix">--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user1-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Alexander Pierce</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user8-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Norman</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user7-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Jane</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user6-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">John</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user2-160x160.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Alexander</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user5-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Sarah</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user4-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Nora</a>--}}
{{--                                </li>--}}
{{--                                <li>--}}
{{--                                    <img src="dist/img/user3-128x128.jpg" alt="User Image">--}}
{{--                                    <a class="users-list-name" href="#">Nadia</a>--}}
{{--                                </li>--}}
{{--                            </ul>--}}
{{--                            <!-- /.users-list -->--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
            </div>
        </div>
    </section>
</div>
@endsection

@section('extra_js')
    <!-- Chat -->
    <script src="{{url('/js/Chat.js')}}"></script>
@stop
