<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{route('home')}}" class="brand-link">
        <img src="{{ asset('dist/img/coding.png')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3 bg-light" style="opacity: .8">
        <span class="brand-text font-weight-light">AdminDev</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{asset('dist/img/avatar4.png')}}" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="{{route('home')}}" class="d-block">{{ Auth::user()->name }}</a>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar nav-child-indent nav-compact nav-legacy nav-flat flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="{{route('user-list')}}" class="nav-link">
                        <i class="nav-icon fas fa-user-cog"></i>
                        <p>Amministra</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{route('attivita-list')}}" class="nav-link">
                        <i class="nav-icon fas fa-chart-line"></i>
                        <p>Attivita</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{route('album-list')}}" class="nav-link">
                        <i class="nav-icon fas fa-images"></i>
                        <p>Galleria</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{route('chat')}}" class="nav-link">
                        <i class="nav-icon fas fa-comments"></i>
                        <p>Chat</p>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>
