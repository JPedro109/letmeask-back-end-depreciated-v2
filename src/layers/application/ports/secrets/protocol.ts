import { SecretsEnum } from "./enum";

export interface SecretsProtocol {
    getSecret(name: SecretsEnum): string | null;
    getRequiredSecret(name: SecretsEnum): string;
}