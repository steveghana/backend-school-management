import { strict as assert } from 'assert';
import useTestDb from '../test';

describe('CredentialToken model', () => {
    describe('Deletion', () => {
        it('Deletes related authToken', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.credentialToken.create({});
                await db.models.authToken.create({ credentialTokenId: parentRecord.id });
                const childrenBefore = await db.models.authToken.findAll();
                await db.models.credentialToken.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.authToken.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by authToken deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.credentialToken.create({});
                await db.models.authToken.create({ credentialTokenId: parentRecord.id });
                const parentBefore = await db.models.credentialToken.findAll();
                await db.models.authToken.destroy({
                    where: {
                        credentialTokenId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.credentialToken.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});

describe('Customer model', () => {
    describe('Deletion', () => {
        it('Deletes related feedback', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.customer.create({});
                await db.models.feedback.create({ customerId: parentRecord.id, text: '', rating: 0 });
                const childrenBefore = await db.models.feedback.findAll();
                await db.models.customer.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.feedback.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by feedback deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.customer.create({});
                await db.models.feedback.create({ customerId: parentRecord.id, text: '', rating: 0 });
                const parentBefore = await db.models.customer.findAll();
                await db.models.feedback.destroy({
                    where: {
                        customerId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.customer.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queueCustomer', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.customer.create({});
                await db.models.queueCustomer.create({ customerId: parentRecord.id, number: 0 });
                const childrenBefore = await db.models.queueCustomer.findAll();
                await db.models.customer.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.queueCustomer.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueCustomer deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.customer.create({});
                await db.models.queueCustomer.create({ customerId: parentRecord.id, number: 0 });
                const parentBefore = await db.models.customer.findAll();
                await db.models.queueCustomer.destroy({
                    where: {
                        customerId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.customer.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});

describe('Queue model', () => {
    describe('Deletion', () => {
        it('Deletes related queueCustomer', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queue.create({ name: '' });
                await db.models.queueCustomer.create({ queueId: parentRecord.id, number: 0 });
                const childrenBefore = await db.models.queueCustomer.findAll();
                await db.models.queue.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.queueCustomer.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueCustomer deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queue.create({ name: '' });
                await db.models.queueCustomer.create({ queueId: parentRecord.id, number: 0 });
                const parentBefore = await db.models.queue.findAll();
                await db.models.queueCustomer.destroy({
                    where: {
                        queueId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.queue.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});

describe('QueueArea model', () => {
    describe('Deletion', () => {
        it('Deletes related queueAreaTrait', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueArea.create({ name: '' });
                await db.models.queueAreaTrait.create({ queueAreaId: parentRecord.id, type: 'smoker' });
                const childrenBefore = await db.models.queueAreaTrait.findAll();
                await db.models.queueArea.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.queueAreaTrait.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueAreaTrait deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueArea.create({ name: '' });
                await db.models.queueAreaTrait.create({ queueAreaId: parentRecord.id, type: 'smoker' });
                const parentBefore = await db.models.queueArea.findAll();
                await db.models.queueAreaTrait.destroy({
                    where: {
                        queueAreaId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.queueArea.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queueCustomerQueueArea', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueArea.create({ name: '' });
                await db.models.queueCustomerQueueArea.create({ queueAreaId: parentRecord.id });
                const childrenBefore = await db.models.queueCustomerQueueArea.findAll();
                await db.models.queueCustomerQueueArea.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.queueCustomerQueueArea.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueCustomerQueueArea deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueArea.create({ name: '' });
                const qArea = await db.models.queueCustomerQueueArea.create({ queueAreaId: parentRecord.id });
                const parentBefore = await db.models.queueArea.findAll();
                await db.models.queueCustomerQueueArea.destroy({
                    where: {
                        id: qArea.id,
                    },
                });
                const parentAfter = await db.models.queueArea.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});

describe('QueueCustomer model', () => {
    describe('Deletion', () => {
        it('Deletes related queueCustomerQueueArea', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueCustomer.create({ number: 0 });
                await db.models.queueCustomerQueueArea.create({ queueCustomerId: parentRecord.id });
                const childrenBefore = await db.models.queueCustomerQueueArea.findAll();
                await db.models.queueCustomer.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.queueCustomerQueueArea.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueCustomerQueueArea deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueCustomer.create({ number: 0 });
                await db.models.queueCustomerQueueArea.create({ queueCustomerId: parentRecord.id });
                const parentBefore = await db.models.queueCustomer.findAll();
                await db.models.queueCustomerQueueArea.destroy({
                    where: {
                        queueCustomerId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.queueCustomer.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queueCustomerTrait', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueCustomer.create({ number: 0 });
                await db.models.queueCustomerTrait.create({ queueCustomerId: parentRecord.id, type: 'smoker' });
                const childrenBefore = await db.models.queueCustomerTrait.findAll();
                await db.models.queueCustomer.destroy({
                    where: {
                        id: parentRecord.id,
                    },
                });
                const childrenAfter = await db.models.queueCustomerTrait.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueCustomerTrait deletion', async () => {
            await useTestDb(async db => {
                const parentRecord = await db.models.queueCustomer.create({ number: 0 });
                await db.models.queueCustomerTrait.create({ queueCustomerId: parentRecord.id, type: 'smoker' });
                const parentBefore = await db.models.queueCustomer.findAll();
                await db.models.queueCustomerTrait.destroy({
                    where: {
                        queueCustomerId: parentRecord.id,
                    },
                });
                const parentAfter = await db.models.queueCustomer.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});

describe('QueueGroup model', () => {
    describe('Deletion', () => {
        it('Deletes related advertisement', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.advertisement.create({ queueGroupId: queueGroup.id });
                const adsBefore = await db.models.advertisement.findAll();
                await db.models.queueGroup.destroy({
                    where: {
                        id: queueGroup.id,
                    },
                });
                const adsAfter = await db.models.advertisement.findAll();

                assert.strictEqual(adsBefore.length, 1);
                assert.strictEqual(adsAfter.length, 0);
            });
        });

        it('IS NOT triggered by advertisement deletion', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.advertisement.create({ queueGroupId: queueGroup.id, name: '' });
                const parentBefore = await db.models.queueGroup.findAll();
                await db.models.advertisement.destroy({
                    where: {
                        queueGroupId: queueGroup.id,
                    },
                });
                const parentAfter = await db.models.queueGroup.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queue', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.queue.create({ queueGroupId: queueGroup.id, name: '' });
                const queueBefore = await db.models.queue.findAll();
                await db.models.queueGroup.destroy({
                    where: {
                        id: queueGroup.id,
                    },
                });
                const queueAfter = await db.models.queue.findAll();

                assert.strictEqual(queueBefore.length, 1);
                assert.strictEqual(queueAfter.length, 0);
            });
        });

        it('IS NOT triggered by queue deletion', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.queue.create({ queueGroupId: queueGroup.id, name: '' });
                const parentBefore = await db.models.queueGroup.findAll();
                await db.models.queue.destroy({
                    where: {
                        queueGroupId: queueGroup.id,
                    },
                });
                const parentAfter = await db.models.queueGroup.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queueArea', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.queueArea.create({ queueGroupId: queueGroup.id, name: '' });
                const areaBefore = await db.models.queueArea.findAll();
                await db.models.queueGroup.destroy({
                    where: {
                        id: queueGroup.id,
                    },
                });
                const areaAfter = await db.models.queueArea.findAll();

                assert.strictEqual(areaBefore.length, 1);
                assert.strictEqual(areaAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueArea deletion', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.queueArea.create({ queueGroupId: queueGroup.id, name: '' });
                const parentBefore = await db.models.queueGroup.findAll();
                await db.models.queueArea.destroy({
                    where: {
                        queueGroupId: queueGroup.id,
                    },
                });
                const parentAfter = await db.models.queueGroup.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queueGroupUserPermission', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.queueGroupUserPermission.create({ queueGroupId: queueGroup.id, name: '' });
                const childrenBefore = await db.models.queueGroupUserPermission.findAll();
                await db.models.queueGroup.destroy({
                    where: {
                        id: queueGroup.id,
                    },
                });
                const childrenAfter = await db.models.queueGroupUserPermission.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueGroupUserPermission deletion', async () => {
            await useTestDb(async db => {
                const queueGroup = await db.models.queueGroup.create({ name: '' });
                await db.models.queueGroupUserPermission.create({ queueGroupId: queueGroup.id, name: '' });
                const parentBefore = await db.models.queueGroup.findAll();
                await db.models.queueGroupUserPermission.destroy({
                    where: {
                        queueGroupId: queueGroup.id,
                    },
                });
                const parentAfter = await db.models.queueGroup.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});

describe('Reservation model', () => {
    const defaultReservation = {
        date: new Date(),
        startTimeHour: 0,
        startTimeMinute: 0,
        endTimeHour: 0,
        endTimeMinute: 0,
    };

    it('Is deleted when customer is deleted', async () => {
        await useTestDb(async db => {
            const customer = await db.models.customer.create({});
            await db.models.reservation.create({
                ...defaultReservation,
                customerId: customer.id,
            });

            await db.models.customer.destroy({ where: { id: customer.id } });

            const reservationsAfter = await db.models.reservation.findAll();
            assert.strictEqual(reservationsAfter.length, 0);
        });
    });

    it("Doesn't delete customer when deleted", async () => {
        await useTestDb(async db => {
            const customer = await db.models.customer.create({});
            const reservation = await db.models.reservation.create({
                ...defaultReservation,
                customerId: customer.id,
            });

            await db.models.reservation.destroy({ where: { id: reservation.id } });

            const customersAfter = await db.models.customer.findAll();
            assert.strictEqual(customersAfter.length, 1);
        });
    });

    it('Is deleted when queueGroup is deleted', async () => {
        await useTestDb(async db => {
            const queueGroup = await db.models.queueGroup.create({ name: '' });
            await db.models.reservation.create({
                ...defaultReservation,
                queueGroupId: queueGroup.id,
            });

            await db.models.queueGroup.destroy({ where: { id: queueGroup.id } });

            const reservationsAfter = await db.models.reservation.findAll();
            assert.strictEqual(reservationsAfter.length, 0);
        });
    });

    it("Doesn't delete queueGroup when deleted", async () => {
        await useTestDb(async db => {
            const queueGroup = await db.models.queueGroup.create({ name: '' });
            const reservation = await db.models.reservation.create({
                ...defaultReservation,
                queueGroupId: queueGroup.id,
            });

            await db.models.reservation.destroy({ where: { id: reservation.id } });

            const queueGroupsAfter = await db.models.queueGroup.findAll();
            assert.strictEqual(queueGroupsAfter.length, 1);
        });
    });
});

describe('ReservationQueueArea model', () => {
    const defaultReservation = {
        date: new Date(),
        startTimeHour: 0,
        startTimeMinute: 0,
        endTimeHour: 0,
        endTimeMinute: 0,
    };

    it('Is deleted when reservation is deleted', async () => {
        await useTestDb(async db => {
            const reservation = await db.models.reservation.create({
                ...defaultReservation,
            });
            await db.models.reservationQueueArea.create({ reservationId: reservation.id });

            await db.models.reservation.destroy({ where: { id: reservation.id } });

            const reservationQueueAreasAfter = await db.models.reservationQueueArea.findAll();
            assert.strictEqual(reservationQueueAreasAfter.length, 0);
        });
    });

    it("Doesn't delete reservation when deleted", async () => {
        await useTestDb(async db => {
            const reservation = await db.models.reservation.create({
                ...defaultReservation,
            });
            const rqa = await db.models.reservationQueueArea.create({ reservationId: reservation.id });

            await db.models.reservationQueueArea.destroy({ where: { id: rqa.id } });

            const reservationsAfter = await db.models.reservation.findAll();
            assert.strictEqual(reservationsAfter.length, 1);
        });
    });

    it('Is deleted when queueArea is deleted', async () => {
        await useTestDb(async db => {
            const queueArea = await db.models.queueArea.create({ name: '' });
            await db.models.reservationQueueArea.create({ queueAreaId: queueArea.id });

            await db.models.queueArea.destroy({ where: { id: queueArea.id } });

            const reservationQueueAreasAfter = await db.models.reservationQueueArea.findAll();
            assert.strictEqual(reservationQueueAreasAfter.length, 0);
        });
    });

    it("Doesn't delete queueArea when deleted", async () => {
        await useTestDb(async db => {
            const queueArea = await db.models.queueArea.create({ name: '' });
            const rqa = await db.models.reservationQueueArea.create({ queueAreaId: queueArea.id });

            await db.models.reservationQueueArea.destroy({ where: { id: rqa.id } });

            const queueAreasAfter = await db.models.queueArea.findAll();
            assert.strictEqual(queueAreasAfter.length, 1);
        });
    });
});

describe('ReservationTrait model', () => {
    const defaultReservation = {
        date: new Date(),
        startTimeHour: 0,
        startTimeMinute: 0,
        endTimeHour: 0,
        endTimeMinute: 0,
    };

    it('Is deleted when reservation is deleted', async () => {
        await useTestDb(async db => {
            const reservation = await db.models.reservation.create(defaultReservation);
            await db.models.reservationTrait.create({ reservationId: reservation.id, type: 'smoker' });

            await db.models.reservation.destroy({ where: { id: reservation.id } });

            const reservationTraitsAfter = await db.models.reservationTrait.findAll();
            assert.strictEqual(reservationTraitsAfter.length, 0);
        });
    });

    it("Doesn't delete reservation when deleted", async () => {
        await useTestDb(async db => {
            const reservation = await db.models.reservation.create(defaultReservation);
            const rt = await db.models.reservationTrait.create({ reservationId: reservation.id, type: 'smoker' });

            await db.models.reservationTrait.destroy({ where: { id: rt.id } });

            const reservationsAfter = await db.models.reservation.findAll();
            assert.strictEqual(reservationsAfter.length, 1);
        });
    });
});

describe('User model', () => {
    describe('Deletion', () => {
        it('Deletes related credentialToken', async () => {
            await useTestDb(async db => {
                const userEmail = 'test@q-int.com';
                const parentRecord = await db.models.user.create({
                    email: userEmail,
                    password: '',
                });
                await db.models.credentialToken.create({ userEmail: parentRecord.email });
                const childrenBefore = await db.models.credentialToken.findAll();
                await db.models.user.destroy({
                    where: {
                        email: parentRecord.email,
                    },
                });
                const childrenAfter = await db.models.credentialToken.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by credentialToken deletion', async () => {
            await useTestDb(async db => {
                const userEmail = 'test@q-int.com';
                const parentRecord = await db.models.user.create({
                    email: userEmail,
                    password: '',
                });
                await db.models.credentialToken.create({ userEmail: parentRecord.email });
                const parentBefore = await db.models.user.findAll();
                await db.models.credentialToken.destroy({
                    where: {
                        userEmail: parentRecord.email,
                    },
                });
                const parentAfter = await db.models.user.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related authToken', async () => {
            await useTestDb(async db => {
                const userEmail = 'test@q-int.com';
                const parentRecord = await db.models.user.create({
                    email: userEmail,
                    password: '',
                });
                await db.models.authToken.create({ userEmail: parentRecord.email });
                const childrenBefore = await db.models.authToken.findAll();
                await db.models.user.destroy({
                    where: {
                        email: parentRecord.email,
                    },
                });
                const childrenAfter = await db.models.authToken.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by authToken deletion', async () => {
            await useTestDb(async db => {
                const userEmail = 'test@q-int.com';
                const parentRecord = await db.models.user.create({
                    email: userEmail,
                    password: '',
                });
                await db.models.authToken.create({ userEmail: parentRecord.email });
                const parentBefore = await db.models.user.findAll();
                await db.models.authToken.destroy({
                    where: {
                        userEmail: parentRecord.email,
                    },
                });
                const parentAfter = await db.models.user.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });

        it('Deletes related queueGroupUserPermission', async () => {
            await useTestDb(async db => {
                const userEmail = 'test@q-int.com';
                const parentRecord = await db.models.user.create({
                    email: userEmail,
                    password: '',
                });
                await db.models.queueGroupUserPermission.create({ userEmail: parentRecord.email });
                const childrenBefore = await db.models.queueGroupUserPermission.findAll();
                await db.models.user.destroy({
                    where: {
                        email: parentRecord.email,
                    },
                });
                const childrenAfter = await db.models.queueGroupUserPermission.findAll();

                assert.strictEqual(childrenBefore.length, 1);
                assert.strictEqual(childrenAfter.length, 0);
            });
        });

        it('IS NOT triggered by queueGroupUserPermission deletion', async () => {
            await useTestDb(async db => {
                const userEmail = 'test@q-int.com';
                const parentRecord = await db.models.user.create({
                    email: userEmail,
                    password: '',
                });
                await db.models.queueGroupUserPermission.create({ userEmail: parentRecord.email });
                const parentBefore = await db.models.user.findAll();
                await db.models.queueGroupUserPermission.destroy({
                    where: {
                        userEmail: parentRecord.email,
                    },
                });
                const parentAfter = await db.models.user.findAll();

                assert.strictEqual(parentBefore.length, 1);
                assert.strictEqual(parentAfter.length, 1);
            });
        });
    });
});
