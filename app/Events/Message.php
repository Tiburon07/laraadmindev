<?php

namespace App\Events;

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

    public function __construct($username, $message, $userId){
        $this->user_name = $username;
        $this->user_id = $userId;
        $this->message  = $message;
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
        $query = "insert into messages (user_id,user_name,message) values (:user_id,:user_name,:message)";
        DB::insert($query, $data);
        return new Channel('chat');
    }

    public function broadcastAs(){
        return 'message';
    }

}
