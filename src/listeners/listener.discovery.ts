import { NecordBaseDiscovery } from '../context';

export interface ListenerMeta {
	target: 'client' | 'ws';
	type: 'once' | 'on';
	event: string | symbol | number;
}

/**
 * Represents a listener discovery.
 */
export class ListenerDiscovery extends NecordBaseDiscovery<ListenerMeta> {
	public getTarget() {
		return this.meta.target;
	}

	public getType() {
		return this.meta.type;
	}

	public getEvent() {
		return this.meta.event.toString();
	}

	public override isListener(): this is ListenerDiscovery {
		return true;
	}

	public override toJSON(): Record<string, any> {
		return this.meta;
	}
}
