import { Listener } from './listener.decorator';
import { NecordWsEvents } from '../handlers/ws';

/**
 * Decorator that marks a method as a listener for the discord.js client.ws.
 * @param event The event name.
 * @returns The decorated method.
 * @url https://necord.org/listeners
 */
export function OnWs<E = NecordWsEvents>(event: keyof NoInfer<E>): ReturnType<typeof Listener>;
/**
 * @deprecated Use `On<CustomEvents>()` instead - This will be removed in future versions.
 * Or use `createCustomOnDecorator<CustomEvents>()` to create a custom `On` decorator.
 */
export function OnWs<K extends keyof E, E = NecordWsEvents>(event: K): ReturnType<typeof Listener>;
export function OnWs(event: keyof NecordWsEvents) {
	return Listener({ target: 'ws', type: 'on', event });
}

/**
 * Helper to create a strongly typed `On` decorator for custom events.
 * This is useful when you have custom events that are not part of the default `NecordEvents`.
 * @example
 * ```typescript
 * interface CustomEvents {
 *  myCustomEvent: [string, number];
 *  anotherEvent: [boolean];
 * }
 *
 * const OnCustom = createCustomOnDecorator<CustomEvents>();
 *
 * class MyListener {
 *  @OnCustom('myCustomEvent')
 *  handleMyCustomEvent(@Context() [name, age]: [string, number]) {
 *   console.log(`Name: ${name}, Age: ${age}`);
 *  }
 * }
 *```
 * @returns A strongly typed `On` decorator for custom events.
 */
export function createCustomOnWsDecorator<Events>() {
	return <K extends keyof Events>(event: K) => OnWs<Events>(event);
}
