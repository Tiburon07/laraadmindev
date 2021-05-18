@extends('base.base')

@section('document_ready')
    new admindev.attivita.AttivitaList();
@stop

@section('content')
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Attivita</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                            <li class="breadcrumb-item active">Attivita</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div id="container_table_attivita" class="row collapse show">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Lista Attivita</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" id="attivita_btn_new_attivita" title="Aggiungi Attivita">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive-sm">
                                            <table id="attivita_table" class="table table-sm table-hover table-striped" width="100%">
                                                <thead></thead>
                                                <tbody class="text-center"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="container_detail_attivita" class="collapse hide">
                    <a id="torna_lista_attivita" href="#"><i class="fas fa-arrow-up"></i> Torna alla lista</a>
                    <h4 id="title_detail_attivita"></h4>
                    <p id="descr_detail_atttivita"></p>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title"><i class="fas fa-tasks"></i> Task</h3>
                                    <div class="card-tools">
    {{--                                    <button type="button" class="btn btn-tool" id="attivita_btn_new_task" title="Aggiungi Task">--}}
    {{--                                        <i class="fas fa-plus"></i>--}}
    {{--                                    </button>--}}
                                    </div>
                                </div>
                                <div class="card-body">
                                    <ul id="attivita_task_ul" class="todo-list" data-widget="todo-list"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title"><i class="fas fa-bookmark"></i> Bookmark</h3>
                                    <div class="card-tools">
    {{--                                    <button type="button" class="btn btn-tool" id="attivita_btn_bookmark" title="Aggiungi bookmark">--}}
    {{--                                        <i class="fas fa-plus"></i>--}}
    {{--                                    </button>--}}
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="timeline"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

@include('components.modal')
@include('attivita.components._modalAttivita')
@include('attivita.components._modalInfoTpl')
@endsection

@section('extra_js')
    <!-- DataTables  & Plugins -->
    <script src="{{url('/plugins/datatables/jquery.dataTables.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
    <script src="{{url('/plugins/jszip/jszip.min.js')}}"></script>
    <script src="{{url('/plugins/pdfmake/pdfmake.min.js')}}"></script>
    <script src="{{url('/plugins/pdfmake/vfs_fonts.js')}}"></script>
    <script src="{{url('/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
    <script src="{{url('/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>

    <!-- Attivita -->
    <script src="{{url('/js/attivita/ModalNewAttivita.js')}}"></script>
    <script src="{{url('/js/attivita/AttivitaList.js')}}"></script>
@stop
