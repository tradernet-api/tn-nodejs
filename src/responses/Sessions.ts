export interface Session {
    expire: number;
    expire_datetime: string;
    id: number;
    ip: string;
    ip_client: string;
    key_current: number;
    owner_login: string;
    safety_type_id: number;
    start_datetime: string;
    user_login: string;
}

export type Sessions = Session[];
