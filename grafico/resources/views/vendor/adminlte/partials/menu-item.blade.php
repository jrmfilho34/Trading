@if (is_string($item))
    <li class="header">{{ $item }} 1</li>
@else
    <li class="{{ $item['class'] }}">
        <a href="{{ $item['href'] }}"
           @if (isset($item['target'])) target="{{ $item['target'] }}" @endif
        >
            <i class="fa fa-fw fa-{{ isset($item['icon']) ? $item['icon'] : 'circle-o' }} {{ isset($item['icon_color']) ? 'text-' . $item['icon_color'] : '' }}"></i>
            <span>{{ $item['text'] }} 2</span>
            @if (isset($item['label']))
                <span class="pull-right-container">
                    <span class="label label-{{ isset($item['label_color']) ? $item['label_color'] : 'primary' }} pull-right">{{ $item['label'] }} 3</span>
                </span>
            @elseif (isset($item['submenu']))
                <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
                </span>
            @endif
        </a>
        @if (isset($item['submenu']))
            <ul class="{{ $item['submenu_class'] }}">
                @each('adminlte::partials.menu-item', $item['submenu'], 'item') 4
            </ul>
        @endif
    </li>
@endif
