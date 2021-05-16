<?php

namespace App\Events;

use Date;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Models\Message as MessageModel;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user_name;
    public $user_id;
    public $message;
    public $created_at;

    public function __construct($username, $message, $userId){
        date_default_timezone_set('Europe/Rome');
        $this->user_name = $username;
        $this->user_id = $userId;
        $this->message  = $message;
        $this->created_at  = date('Y-m-d H:i:s');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $data['user_id'] = $this->user_id;
        $data['user_name'] = $this->user_name;
        $data['message'] = $this->message;
        $data['created_at'] = $this->created_at;
        $query = "insert into messages (user_id,user_name,message, created_at) values (:user_id,:user_name,:message, :created_at)";
        DB::insert($query, $data);
        return new Channel('chat');
    }

    public function broadcastAs(){
        return 'message';
    }

}
