@extends('base.base')

@section('document_ready')
    new admindev.Home();
@stop

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Home</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item active">Home</li>
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
                <div class="col-md-6">
                    <div class="card direct-chat direct-chat-primary">
                        <div class="card-header">
                            <h3 class="card-title">Chat</h3>
                            <div class="card-tools">
                                <span title="3 New Messages" class="badge badge-primary">1</span>
                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                <button type="button" class="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle"><i class="fas fa-comments"></i></button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="chat_content" class="direct-chat-messages"></div>
                            <div class="direct-chat-contacts">
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
                            <div class="input-group">
                                <input type="text" id="chat_input_msg" name="message" placeholder="Type Message ..." class="form-control">
                                <span class="input-group-append">
                                    <button id="chat_btn_send" type="button" class="btn btn-primary">Send</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection

@section('extra_js')
    <!-- Home -->
    <script src="{{url('/js/Home.js')}}"></script>
@stop
